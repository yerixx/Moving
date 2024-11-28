import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { useRef, useState, useEffect } from "react";
import SlideButton from "./SlideButton";
import { motion } from "framer-motion";

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

    @media (max-width: 768px) {
      padding: 0 5px;
    }
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

    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
      &:before {
        font-size: 30px;
      }
    }
  }

  .slick-prev {
    left: 25px;
    @media (max-width: 768px) {
      left: 15px;
    }
  }

  .slick-next {
    right: 25px;
    @media (max-width: 768px) {
      right: 15px;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 30px;
    padding: 0 15px;
  }
`;

const SlideItem = styled(motion.div)<{ $bgPhoto: string }>`
  width: 100%;
  height: 24vw;
  background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transform-origin: center center;
  overflow: hidden;

  @media (max-width: 1200px) {
    height: 32vw;
  }

  @media (max-width: 768px) {
    height: 48vw;
  }

  @media (max-width: 480px) {
    height: 56vw;
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

    @media (max-width: 1200px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

interface MainSliderProps {
  data: any[];
  genereData: any;
  onBoxClick: (movieId: number) => void;
  sliderId: string;
}

const MainSlider = ({
  data,
  genereData,
  onBoxClick,
  sliderId,
}: MainSliderProps) => {
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
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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

  return (
    <Wrapper>
      <SlideButton direction="prev" onClick={handlePrev} />
      <Slider ref={sliderRef} {...settings}>
        {randomizedData.map((item: any) => (
          <SlideItem
            key={item.id}
            $bgPhoto={makeImagePath(item.poster_path || "")}
            onClick={() => onBoxClick(item.id)}
            whileHover={{ scale: 1.02 }}
            transition={{
              type: "tween",
              duration: 0.3,
            }}
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
