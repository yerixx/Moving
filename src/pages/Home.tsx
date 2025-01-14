import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
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
import Header from "../components/Header/Header";
import MovieModal from "../components/MovieModal";

const Container = styled.div`
  width: 100%;
  margin-top: 60px;
  background: ${(props) => props.theme.black.darker};
  overflow-x: hidden;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
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

  @media (max-width: 1050px) {
    font-size: 50px;
    margin-top: 80px;
  }

  @media (max-width: 800px) {
    font-size: 30px;
    margin-top: 60px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-top: 40px;
  }
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
  line-height: 1.5;

  @media (max-width: 1200px) {
    font-size: 20px;
    width: 60%;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    width: 80%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    width: 90%;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  margin-bottom: 100px;
  padding: 0 30px;
  .slick-slide {
    padding-left: 80px;
    @media (max-width: 768px) {
      padding: 0 30px;
    }
    @media (max-width: 480px) {
      padding: 0 15px;
    }
  }

  @media (max-width: 768px) {
    padding: 0 30px;
    margin-bottom: 60px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
    margin-bottom: 40px;
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

  @media (max-width: 1200px) {
    height: 35vw;
  }

  @media (max-width: 768px) {
    height: 50vw;
  }

  @media (max-width: 480px) {
    height: 60vw;
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
  margin-bottom: 30px;
  margin-left: 50px;
  color: ${(props) => props.theme.white.darker};

  @media (max-width: 1050px) {
    font-size: 28px;
    margin-left: 40px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-left: 30px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 15px;
  }
`;

const SlideRank = styled.span`
  font-size: 88px;
  font-weight: 900;
  position: absolute;
  top: -10px;
  left: -70px;
  color: ${(props) => props.theme.white.darker};

  @media (max-width: 1050px) {
    font-size: 70px;
    left: -60px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    left: 10px;
    top: 30px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    padding: 6px 10px;
  }
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

  @media (max-width: 768px) {
    font-size: 12px;

    span {
      padding: 1px 4px;
      margin-right: 4px;
    }
  }

  @media (max-width: 480px) {
    font-size: 10px;

    span {
      padding: 1px 3px;
      margin-right: 3px;
    }
  }
`;

const SubTitle = styled.h2`
  font-size: 26px;
  margin-bottom: 30px;
  margin-left: 50px;
  color: ${(props) => props.theme.white.darker};

  @media (max-width: 1050px) {
    font-size: 24px;
    margin-left: 40px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 30px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-left: 20px;
    margin-bottom: 15px;
  }
`;

const offset = 4;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

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

  const { scrollY } = useScroll();

  const sliderRef = useRef<Slider>(null);

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

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
        breakpoint: 1000,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const BannerSlider = styled.div`
    margin-bottom: 60px;
    position: relative;
    .slick-slide div {
      outline: none;
    }
  `;

  const BannerButton = styled.div<{ direction: string }>`
    width: 50px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
    ${(props) => (props.direction === "prev" ? "left: 0" : "right: 0")};
    transition: all 0.2s ease;
    &:hover {
      background-color: ${(props) => props.theme.blue};
      width: 60px;
    }

    &:active {
      background-color: ${(props) => props.theme.blue};
      opacity: 0.8;
      width: 55px;
    }

    &::before {
      content: "";
      width: 10px;
      height: 10px;
      border-top: 3px solid white;
      border-right: 3px solid white;
      transform: ${(props) =>
        props.direction === "prev"
          ? "rotate(-135deg) translateX(2px)"
          : "rotate(45deg) translateX(-2px)"};
      transition: transform 0.2s ease;
    }

    &:hover::before {
      transform: ${(props) =>
        props.direction === "prev"
          ? "rotate(-135deg) translateX(5px) scale(1.2)"
          : "rotate(45deg) translateX(-5px) scale(1.2)"};
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

    @media (max-width: 1200px) {
      height: 500px;
    }

    @media (max-width: 768px) {
      height: 400px;
      padding: 0 30px;
    }

    @media (max-width: 480px) {
      height: 300px;
    }
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

  const bannerSliderRef = useRef<Slider>(null);

  const handleBannerPrev = () => {
    bannerSliderRef.current?.slickPrev();
  };

  const handleBannerNext = () => {
    bannerSliderRef.current?.slickNext();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const { width } = useWindowSize();

  return (
    <Container>
      <Header />
      {nowPlayingLoading || todayLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BannerSlider>
            <BannerButton direction="prev" onClick={handleBannerPrev} />
            <Slider ref={bannerSliderRef} {...bannerSettings}>
              {nowPlayingData?.results.slice(0, 5).map((movie) => (
                <BannerItem
                  key={movie.id}
                  $bgPhoto={makeImagePath(movie.backdrop_path || "")}
                >
                  <Title>{movie.title}</Title>
                  <Overview>
                    {width > 1200
                      ? truncateText(movie.overview, 200)
                      : width > 768
                      ? truncateText(movie.overview, 150)
                      : width > 480
                      ? truncateText(movie.overview, 100)
                      : truncateText(movie.overview, 50)}
                  </Overview>
                </BannerItem>
              ))}
            </Slider>
            <BannerButton direction="next" onClick={handleBannerNext} />
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
