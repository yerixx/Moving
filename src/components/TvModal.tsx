import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import YouTube from "react-youtube";
import { FaRegStar } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { BiSolidCameraMovie } from "react-icons/bi";

const ModalBox = styled(motion.div)`
  position: absolute;
  left: 0%;
  right: 0%;
  margin: 0 auto;
  width: 85vw;
  height: 85vh;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.darker};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  z-index: 99;
  @media (max-width: 768px) {
    width: 95vw;
    flex-direction: column;
    height: auto;
    max-height: 90vh;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 98;
`;

const TvInfo = styled.div`
  flex: 2;
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.blue};
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    order: 2;
  }
`;

const TvHeader = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const TvPoster = styled.div<{ $bgPhoto: string }>`
  width: 200px;
  height: 300px;
  background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 160px;
    height: 240px;
  }
`;

const TvBasicInfo = styled.div`
  flex: 1;
`;

const TvTitle = styled.h3`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(to right, ${(props) => props.theme.blue}, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TvStats = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  span {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 500;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      color: ${(props) => props.theme.blue};
    }
  }
`;

const TvOverView = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.blue};
  display: flex;
  align-items: center;
  &:before {
    margin-right: 10px;
  }
`;

const ReviewTitle = styled(SectionTitle)`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    color: ${(props) => props.theme.white.darker};
  }
`;

const VideoTitle = styled(SectionTitle)`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    color: ${(props) => props.theme.white.darker};
  }
`;

const ReviewSection = styled.div`
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  margin-bottom: 40px;
`;

const ReviewItem = styled.div`
  margin-bottom: 25px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(5px);

  h5 {
    font-size: 18px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.blue};
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const VideoSection = styled.div`
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;

  .youtube-container {
    margin-bottom: 30px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 15px;
    .youtube-container {
      height: 200px !important;
    }
  }
`;

const VideoItem = styled.div`
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const TvBackground = styled.div<{ $bgPhoto: string }>`
  flex: 1.2;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent),
    url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  position: relative;
  overflow: hidden;
  margin: 20px;
  border-radius: 15px;
  min-height: 300px;

  @media (max-width: 768px) {
    order: 1;
    margin: 10px;
    aspect-ratio: 16/9;
    width: auto;
  }
`;

const NoContent = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    background-color: ${(props) => props.theme.blue};
    transform: scale(1.1);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: white;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

interface TvModalProps {
  tv: any;
  onOverlayClick: () => void;
  layoutId: string;
  scrollY: number;
  reviewsData: any[];
  videosData: any[];
}

const TvModal = ({
  tv,
  onOverlayClick,
  layoutId,
  scrollY,
  reviewsData,
  videosData,
}: TvModalProps) => {
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <ModalBox
        style={{ top: scrollY + 100 }}
        layoutId={layoutId}
        transition={{
          type: "tween",
          duration: 0.3,
          layout: {
            duration: 0.3,
          },
        }}
      >
        <CloseButton onClick={onOverlayClick} />
        <TvInfo>
          <TvHeader>
            <TvPoster $bgPhoto={makeImagePath(tv.poster_path)} />
            <TvBasicInfo>
              <TvTitle>{tv.name}</TvTitle>
              <TvStats>
                <span>
                  <FaRegStar /> {tv.vote_average.toFixed(1)}
                </span>
                <span>
                  <IoPeople /> {tv.popularity.toFixed(0)}
                </span>
                <span>
                  <FaRegCalendarAlt /> {tv.first_air_date}
                </span>
              </TvStats>
              <TvOverView>{tv.overview}</TvOverView>
            </TvBasicInfo>
          </TvHeader>
          <ReviewSection>
            <ReviewTitle>
              <GoCodeReview /> 시청자 리뷰
            </ReviewTitle>
            {reviewsData?.find((review: any) => review.id === tv.id)?.results
              .length ? (
              reviewsData
                ?.find((review: any) => review.id === tv.id)
                ?.results.slice(0, 5)
                .map((review: any) => (
                  <ReviewItem key={review.id}>
                    <h5>{review.author}</h5>
                    <p>
                      {review.content.length > 200
                        ? `${review.content.slice(0, 200)}...`
                        : review.content}
                    </p>
                  </ReviewItem>
                ))
            ) : (
              <NoContent>리뷰가 없습니다.</NoContent>
            )}
          </ReviewSection>

          <VideoSection>
            <VideoTitle>
              <BiSolidCameraMovie /> 관련 영상
            </VideoTitle>
            {videosData?.find((video: any) => video.id === tv.id)?.results
              .length ? (
              videosData
                ?.find((video: any) => video.id === tv.id)
                ?.results.slice(0, 3)
                .map((video: any) => (
                  <VideoItem key={video.id}>
                    <YouTube
                      videoId={video.key}
                      opts={{
                        width: "100%",
                        height: "400px",
                        playerVars: {
                          autoplay: 0,
                          modestbranding: 1,
                          rel: 0,
                        },
                      }}
                      className="youtube-container"
                    />
                  </VideoItem>
                ))
            ) : (
              <NoContent>관련 영상이 없습니다.</NoContent>
            )}
          </VideoSection>
        </TvInfo>
        <TvBackground $bgPhoto={makeImagePath(tv.backdrop_path)} />
      </ModalBox>
    </>
  );
};

export default TvModal;
