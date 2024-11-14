import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { useRef, useState, useEffect } from "react";
import SlideButton from "./SlideButton";

// 이미지 경로 생성 유틸리티 함수
const makeImagePath = (path: string) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
  position: relative;
  padding: 0 30px;
  .slick-slide {
    padding: 0 10px;
  }
  .slick-list {
    /* overflow: visible; */
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

const SlideItem = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 24vw;
  background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
  }
`;

const SlideTitle = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  h4 {
    font-size: 18px;
    font-weight: 500;
  }
`;

const MainSlider = ({ data }: any) => {
  const sliderRef = useRef<Slider>(null);
  const [randomizedData, setRandomizedData] = useState<any[]>([]);

  useEffect(() => {
    const shuffleArray = (array: any[]) => {
      return [...array].sort(() => Math.random() - 0.5);
    };

    setRandomizedData(shuffleArray(data));
  }, [data]);

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    arrows: false, // 기본 화살표 비활성화
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <SlideButton direction="prev" onClick={handlePrev} />
      <Slider ref={sliderRef} {...settings}>
        {randomizedData.map((item: any) => (
          <SlideItem
            key={item.id}
            $bgPhoto={makeImagePath(item.poster_path || "")}
          >
            <SlideTitle>
              <h4>{item.title}</h4>
            </SlideTitle>
          </SlideItem>
        ))}
      </Slider>
      <SlideButton direction="next" onClick={handleNext} />
    </Wrapper>
  );
};

export default MainSlider;
