import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useNavigate, useMatch } from "react-router-dom";
import MainSlider from "../components/MainSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideButton from "../components/SlideButton";
import Header from "../components/Header";
import TvModal from "../components/TvModal";
import {
  getPopularTv,
  getOnTheAirTv,
  getTopRatedTv,
  getTvReviews,
  getTvVideos,
  ITvResult,
} from "../api";

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

const SliderWrapper = styled.div`
  position: relative;
  margin-bottom: 100px;
  padding: 0 60px;
  .slick-slide {
    padding: 0 50px;
    @media (max-width: 768px) {
      padding: 0 30px;
    }
  }

  .slick-list {
    overflow: visible;
    margin: 0 -10px;
  }

  .slick-track {
    display: flex;
    align-items: stretch;
    margin-left: 0;
    margin-right: 0;
  }
`;

const SlideBox = styled(motion.div)<{ $bgPhoto: string }>`
  height: 26vw;
  width: 100%;
  background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 50vw;
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
  margin: 50px 0 30px 50px;
  color: ${(props) => props.theme.white.darker};
`;

const SlideRank = styled.span`
  font-size: 88px;
  font-weight: 900;
  position: absolute;
  top: -10px;
  left: -70px;
  color: ${(props) => props.theme.white.darker};
  @media (max-width: 768px) {
    font-size: 60px;
    left: -50px;
  }
`;

const Tv = () => {
  const history = useNavigate();
  const tvMatch = useMatch("/tv/:tvId");
  const { scrollY } = useScroll();
  const [currentSection, setCurrentSection] = useState("hot");

  const sliderRef = useRef<Slider>(null);

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const onBoxClick = (tvId: number, section?: string) => {
    if (section) setCurrentSection(section);
    history(`/tv/${tvId}`);
  };

  const onOverlayClick = () => {
    history("/tv");
  };

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

  const { data: popularData, isLoading: popularLoading } = useQuery<ITvResult>({
    queryKey: ["popularTv"],
    queryFn: getPopularTv,
  });

  const { data: onTheAirData, isLoading: onTheAirLoading } =
    useQuery<ITvResult>({
      queryKey: ["onTheAirTv"],
      queryFn: getOnTheAirTv,
    });

  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<ITvResult>({
      queryKey: ["topRatedTv"],
      queryFn: getTopRatedTv,
    });

  const clickedTv =
    tvMatch?.params.tvId &&
    (popularData?.results.find((tv) => String(tv.id) === tvMatch.params.tvId) ||
      onTheAirData?.results.find(
        (tv) => String(tv.id) === tvMatch.params.tvId
      ) ||
      topRatedData?.results.find(
        (tv) => String(tv.id) === tvMatch.params.tvId
      ));

  const allTvIds = [
    ...(popularData?.results || []),
    ...(onTheAirData?.results || []),
    ...(topRatedData?.results || []),
  ].map((tv) => tv.id);

  const { data: reviewsData } = useQuery({
    queryKey: ["getTvReviews", allTvIds],
    queryFn: () =>
      allTvIds
        ? Promise.all(allTvIds.map((id) => getTvReviews(id)))
        : Promise.resolve([]),
    enabled: !!allTvIds.length,
  });

  const { data: videosData } = useQuery({
    queryKey: ["getTvVideos", allTvIds],
    queryFn: () =>
      allTvIds
        ? Promise.all(allTvIds.map((id) => getTvVideos(id)))
        : Promise.resolve([]),
    enabled: !!allTvIds.length,
  });

  return (
    <Container>
      <Header />
      {popularLoading || onTheAirLoading || topRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SliderWrapper>
            <SlideTitle>인기 TV 프로그램</SlideTitle>
            <SlideButton direction="prev" onClick={handlePrev} />
            <Slider ref={sliderRef} {...settings}>
              {popularData?.results.slice(0, 10).map((tv, index) => (
                <SlideBox
                  key={tv.id}
                  onClick={() => onBoxClick(tv.id, "hot")}
                  layoutId={`hot-${tv.id}`}
                  $bgPhoto={makeImagePath(tv.poster_path || "")}
                  whileHover="hover"
                >
                  <SlideRank>{index + 1}</SlideRank>
                  <SlideInfo
                    variants={{
                      hover: {
                        opacity: 1,
                        transition: { delay: 0.3, type: "tween" },
                      },
                    }}
                  >
                    <h4>{tv.name}</h4>
                  </SlideInfo>
                </SlideBox>
              ))}
            </Slider>
            <SlideButton direction="next" onClick={handleNext} />
          </SliderWrapper>

          <SlideTitle>최신 TV 프로그램</SlideTitle>
          <MainSlider
            genereData={null}
            data={onTheAirData?.results || []}
            onBoxClick={(id) => onBoxClick(id, "latest")}
            sliderId="latest"
          />

          <SlideTitle>높은 평점의 TV 프로그램</SlideTitle>
          <MainSlider
            genereData={null}
            data={topRatedData?.results || []}
            onBoxClick={(id) => onBoxClick(id, "topRated")}
            sliderId="topRated"
          />

          <AnimatePresence>
            {tvMatch && clickedTv && (
              <TvModal
                tv={clickedTv}
                onOverlayClick={onOverlayClick}
                layoutId={`${currentSection}-${tvMatch.params.tvId}`}
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

export default Tv;
