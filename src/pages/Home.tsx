import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { motion, AnimatePresence, delay, useScroll } from "framer-motion";
import {
  getMovies,
  getTodayMovies,
  GetMoviesResult,
  searchGeneres,
  getReviews,
  getVideos,
} from "../api";
import { makeImagePath } from "../utils";
import { useNavigate, useMatch } from "react-router-dom";
import MainSlider from "../components/MainSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideButton from "../components/SlideButton";
import YouTube from "react-youtube";
import Header from "../components/Header";

const Container = styled.div`
  width: 100%;
  margin-top: 60px;
  background: ${(props) => props.theme.black.darker};
  overflow-x: hidden;
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: ${(props) => props.theme.blue};
`;

const Title = styled.h2`
  font-family: "BobaesumJindoTTF";
  font-weight: 500;
  font-size: 70px;
  margin-bottom: 10px;
  margin-top: 100px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
  line-height: 1.5;
`;

const SliderWrapper = styled.div`
  position: relative;
  margin-bottom: 100px;
  padding: 0 60px;
  .slick-slide {
    padding: 0 50px;
  }
  .slick-list {
    overflow: visible;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 40px;
    height: 40px;
    &:before {
      font-size: 40px;
    }
  }
  .slick-prev {
    left: 25px;
  }
  .slick-next {
    right: 25px;
  }
`;

const SlideBox = styled(motion.div)<{ $bgPhoto: string }>`
  height: 26vw;
  width: 100%;
  background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
  }
`;

const SlideInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 16px;
    color: white;
  }
`;

const SlideTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
  margin-left: 50px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.white.darker};
`;

const SlideRank = styled.span`
  font-size: 88px;
  font-weight: 900;
  position: absolute;
  top: -10px;
  left: -70px;
  color: ${(props) => props.theme.white.darker};
`;

const Genere = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: ${(props) => props.theme.white.darker};
  font-size: 14px;
  span {
    padding: 2px 6px;
    border-radius: 4px;
    margin-right: 6px;
    background-color: ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.black.darker};
    opacity: 0.8;
    font-weight: 600;
  }
`;

const SubTitle = styled.h2`
  font-size: 26px;
  margin-bottom: 30px;
  margin-left: 50px;
  color: ${(props) => props.theme.white.darker};
`;

// const Row = styled(motion.div)`
//   position: absolute;
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 100px;
//   margin-bottom: 10px;
//   padding-left: 100px;
//   padding-right: 60px;
// `;

// const Box = styled(motion.div)<{ $bgPhoto: string | undefined }>`
//   width: auto;
//   height: 25vw;
//   background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
//   font-size: 22px;
//   position: relative;
//   border-radius: 4px;
//   cursor: pointer;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;

// const Info = styled(motion.div)`
//   width: 100%;
//   height: 80px;
//   padding: 20px;
//   opacity: 1;
//   position: absolute;
//   bottom: -17px;
//   background: rgba(0, 0, 0, 0);
//   color: #ffffffd6;
//   h4 {
//     text-align: center;
//     font-size: 16px;
//   }
// `;

const ModalBox = styled(motion.div)`
  position: absolute;
  left: 0%;
  right: 0%;
  margin: 0 auto;
  width: 80vw;
  height: 70vh;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.darker};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const MovieCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: 1;
  margin: 20px;
  border-radius: 12px;
`;

const MovieInfo = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  span {
    padding: 0 20px;
    font-size: 18px;
  }
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`;

const MovieTitle = styled.h3`
  font-size: 60px;
  padding: 10px;
  color: ${(props) => props.theme.white.darker};
  /* color: ${(props) => props.theme.blue}; */
`;

const MovieInfoWrap = styled.div`
  display: flex;
  span {
    padding: 0 20px;
    font-size: 18px;
    font-weight: 600;
  }
`;

const MovieOverView = styled.p`
  padding: 20px;
  line-height: 2;
  font-size: 18px;
`;

const ReviewSection = styled.div`
  padding: 20px;
`;

const ReviewTitle = styled.h3`
  margin-bottom: 15px;
  color: ${(props) => props.theme.blue};
`;

const ReviewItem = styled.div`
  margin-bottom: 20px;
`;
const VideoSection = styled.div`
  padding: 20px;
  .youtube-container {
    margin-bottom: 20px;
  }
`;

const VideoItem = styled.div`
  margin-bottom: 30px;
  /* width: 100%; */
  /* height: 100%; */
  /* aspect-ratio: 16/9; */
`;

const VideoTitle = styled.h3`
  margin-bottom: 15px;
  color: ${(props) => props.theme.blue};
`;

// const rowVariants = {
//   hidden: {
//     x: window.innerWidth + 10,
//   },
//   visible: {
//     x: 0,
//   },
//   exit: {
//     x: -window.innerWidth - 10,
//   },
// };

// const boxVariants = {
//   normal: { scale: 1 },
//   hover: {
//     scale: 1.2,
//     y: -50,
//     transition: { delay: 0.3, type: "tween" },
//     zIndex: 1,
//   },
// };

// const infoVariants = {
//   hover: {
//     bottom: "0",
//     background: "rgba(0, 0, 0, 0.5)",
//     color: "#fff",
//     transition: { delay: 0.3, type: "tween" },
//   },
// };

const offset = 4;

const Home = () => {
  const history = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["nowPlaying"],
      queryFn: getMovies,
    });

  const { data: genereData, isLoading: genereLoading } = useQuery({
    queryKey: ["genere"],
    queryFn: searchGeneres,
  });

  const { data: todayData, isLoading: todayLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["todayPlaying"],
      queryFn: getTodayMovies,
    });

  // const [index, setIndex] = useState(0);
  // const [leaving, setLeaving] = useState(false);
  const { scrollY } = useScroll();

  const sliderRef = useRef<Slider>(null);

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  // const increaseIndex = () => {
  //   if (nowPlayingData) {
  //     if (leaving) return;
  //     setLeaving(true);
  //     const totalMovies = nowPlayingData?.results.length - 12;
  //     const maxIndex = Math.ceil(totalMovies / offset) - 1;
  //     setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  //   }
  // };

  // const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClick = (movieId: number) => {
    history(`/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    history("/");
  };

  const clickedMovie =
    movieMatch?.params.movieId &&
    nowPlayingData?.results.find(
      (movie) => String(movie.id) === movieMatch.params.movieId
    );

  const ids = nowPlayingData?.results.map((movie) => movie.id);
  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ["getReviews", ids],
    queryFn: () =>
      ids ? Promise.all(ids.map((id) => getReviews(id))) : Promise.resolve([]),
    enabled: !!ids,
  });
  const { data: videosData, isLoading: videosLoading } = useQuery({
    queryKey: ["getVideos", ids],
    queryFn: () =>
      ids ? Promise.all(ids.map((id) => getVideos(id))) : Promise.resolve([]),
    enabled: !!ids,
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const BannerSlider = styled.div`
    margin-bottom: 60px;
    .slick-slide div {
      outline: none;
    }
  `;

  const BannerItem = styled.div<{ $bgPhoto: string }>`
    height: 620px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60px;
    background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
      url(${(props) => props.$bgPhoto}) center/cover no-repeat;
    color: ${(props) => props.theme.white.darker};
  `;

  const bannerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Container>
      <Header />
      {nowPlayingLoading || todayLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BannerSlider>
            <Slider {...bannerSettings}>
              {nowPlayingData?.results.slice(0, 5).map((movie) => (
                <BannerItem
                  key={movie.id}
                  $bgPhoto={makeImagePath(movie.backdrop_path || "")}
                >
                  <Title>{movie.title}</Title>
                  <Overview>{movie.overview}</Overview>
                </BannerItem>
              ))}
            </Slider>
          </BannerSlider>

          <SliderWrapper>
            <SlideTitle>오늘의 HOT!</SlideTitle>
            <SlideButton direction="prev" onClick={handlePrev} />
            <Slider ref={sliderRef} {...settings}>
              {nowPlayingData?.results.slice(0, 10).map((movie, index) => (
                <SlideBox
                  key={movie.id}
                  onClick={() => onBoxClick(movie.id)}
                  layoutId={movie.id + ""}
                  $bgPhoto={makeImagePath(movie.poster_path || "")}
                  whileHover="hover"
                >
                  <SlideRank>{index + 1}</SlideRank>
                  <Genere>
                    {movie.genre_ids.map((id) => (
                      <span key={id}>
                        {
                          genereData?.genres.find(
                            (genre: any) => genre.id === id
                          )?.name
                        }
                      </span>
                    ))}
                  </Genere>
                  <SlideInfo
                    variants={{
                      hover: {
                        opacity: 1,
                        transition: { delay: 0.3, type: "tween" },
                      },
                    }}
                  >
                    <h4>{movie.title}</h4>
                  </SlideInfo>
                </SlideBox>
              ))}
            </Slider>
            <SlideButton direction="next" onClick={handleNext} />
          </SliderWrapper>
          <SubTitle>오늘의 추천 영화!</SubTitle>
          <MainSlider
            genereData={genereData}
            data={nowPlayingData?.results || []}
          />
          <SubTitle>당신이 찾고있는 영화!</SubTitle>
          <MainSlider genereData={genereData} data={todayData?.results || []} />
          <SubTitle>내가 최근에 시청한 영화!</SubTitle>
          <MainSlider genereData={genereData} data={todayData?.results || []} />

          <AnimatePresence>
            {movieMatch && (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <ModalBox
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={movieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <MovieInfo>
                        <MovieTitle>{clickedMovie.title}</MovieTitle>
                        <MovieInfoWrap>
                          <span>관객수 : {clickedMovie.popularity}</span>
                          <span>
                            평점 : {clickedMovie.vote_average.toFixed(2)}
                          </span>
                        </MovieInfoWrap>
                        <MovieOverView>{clickedMovie.overview}</MovieOverView>
                        <ReviewSection>
                          <ReviewTitle>리뷰</ReviewTitle>
                          {reviewsData
                            ?.find(
                              (review: any) => review.id === clickedMovie.id
                            )
                            ?.results.slice(0, 5)
                            .map((review: any) => (
                              <ReviewItem key={review.id}>
                                <h5>✍️ {review.author}</h5>
                                <p>
                                  {review.content.length > 200
                                    ? `${review.content.slice(0, 200)}...`
                                    : review.content}
                                </p>
                              </ReviewItem>
                            ))}
                        </ReviewSection>
                        <VideoSection>
                          {videosData
                            ?.find((video: any) => video.id === clickedMovie.id)
                            ?.results.slice(0, 5)
                            .map((video: any) => (
                              <VideoItem key={video.id}>
                                <VideoTitle>{video.name}</VideoTitle>
                                <YouTube
                                  videoId={video.key}
                                  opts={{
                                    width: "100%",
                                    height: "500px",
                                    playerVars: {
                                      autoplay: 0,
                                      modestbranding: 1,
                                      rel: 0,
                                    },
                                  }}
                                  className="youtube-container"
                                />
                              </VideoItem>
                            ))}
                        </VideoSection>
                      </MovieInfo>
                      <MovieCover
                        style={{
                          backgroundImage: `linear-gradient(to top, #00000068, transparent), url(${makeImagePath(
                            clickedMovie.poster_path
                          )})`,
                        }}
                      />
                    </>
                  )}
                </ModalBox>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Container>
  );
};

export default Home;
