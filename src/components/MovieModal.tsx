import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import YouTube from "react-youtube";

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
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MovieTitle = styled.h3`
  font-size: 60px;
  padding: 10px;
  color: ${(props) => props.theme.white.darker};
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
`;

const VideoTitle = styled.h3`
  margin-bottom: 15px;
  color: ${(props) => props.theme.blue};
`;

interface MovieModalProps {
  movie: any;
  onOverlayClick: () => void;
  layoutId: string;
  scrollY: number;
  reviewsData: any[];
  videosData: any[];
}

const MovieModal = ({
  movie,
  onOverlayClick,
  layoutId,
  scrollY,
  reviewsData,
  videosData,
}: MovieModalProps) => {
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
        <MovieInfo>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieInfoWrap>
            <span>관객수 : {movie.popularity}</span>
            <span>평점 : {movie.vote_average.toFixed(2)}</span>
          </MovieInfoWrap>
          <MovieOverView>{movie.overview}</MovieOverView>
          <ReviewSection>
            <ReviewTitle>리뷰</ReviewTitle>
            {reviewsData
              ?.find((review: any) => review.id === movie.id)
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
              ?.find((video: any) => video.id === movie.id)
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
              movie.poster_path
            )})`,
          }}
        />
      </ModalBox>
    </>
  );
};

export default MovieModal;
