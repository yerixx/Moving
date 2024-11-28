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
import MovieModal from "../components/MovieModal";

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

const offset = 4;

const Home = () => {
  const history = useNavigate();
  const movieMatch = useMatch("/home/movies/:movieId");
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

  const [currentSection, setCurrentSection] = useState("hot");

  const onBoxClick = (movieId: number, section?: string) => {
    if (section) setCurrentSection(section);
    history(`/home/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    history("/home");
  };

  const clickedMovie =
    movieMatch?.params.movieId &&
    (nowPlayingData?.results.find(
      (movie) => String(movie.id) === movieMatch.params.movieId
    ) ||
      todayData?.results.find(
        (movie) => String(movie.id) === movieMatch.params.movieId
      ));

  const allMovieIds = [
    ...(nowPlayingData?.results || []),
    ...(todayData?.results || []),
  ].map((movie) => movie.id);

  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ["getReviews", allMovieIds],
    queryFn: () =>
      allMovieIds
        ? Promise.all(allMovieIds.map((id) => getReviews(id)))
        : Promise.resolve([]),
    enabled: !!allMovieIds.length,
  });

  const { data: videosData, isLoading: videosLoading } = useQuery({
    queryKey: ["getVideos", allMovieIds],
    queryFn: () =>
      allMovieIds
        ? Promise.all(allMovieIds.map((id) => getVideos(id)))
        : Promise.resolve([]),
    enabled: !!allMovieIds.length,
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
                  onClick={() => onBoxClick(movie.id, "hot")}
                  layoutId={`hot-${movie.id}`}
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
            onBoxClick={(id) => onBoxClick(id, "recommend")}
            sliderId="recommend"
          />
          <SubTitle>당신이 찾고있는 영화!</SubTitle>
          <MainSlider
            genereData={genereData}
            data={todayData?.results || []}
            onBoxClick={(id) => onBoxClick(id, "search")}
            sliderId="search"
          />
          <SubTitle>내가 최근에 시청한 영화!</SubTitle>
          <MainSlider
            genereData={genereData}
            data={todayData?.results || []}
            onBoxClick={(id) => onBoxClick(id, "recent")}
            sliderId="recent"
          />

          <AnimatePresence>
            {movieMatch && clickedMovie && (
              <MovieModal
                movie={clickedMovie}
                onOverlayClick={onOverlayClick}
                layoutId={`${currentSection}-${movieMatch.params.movieId}`}
                scrollY={scrollY.get()}
                reviewsData={reviewsData || []}
                videosData={videosData || []}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </Container>
  );
};

export default Home;
