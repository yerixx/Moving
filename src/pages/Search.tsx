import { useLocation, useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  GetMoviesResult,
  searchContents,
  searchGeneres,
  getReviews,
  getVideos,
} from "../api";
import { useQuery } from "@tanstack/react-query";
import { makeImagePath } from "../utils";
import Pagination from "react-js-pagination";
import { useState } from "react";
import Header from "../components/Header/Header";
import { AnimatePresence, useScroll, motion } from "framer-motion";
import MovieModal from "../components/MovieModal";

interface GeneresItem {
  id: number;
  name: string;
}

const Wrapper = styled.div`
  padding: 60px 0;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.black.lighter};
`;
const SearchTitle = styled.h2`
  font-size: 30px;
  color: #fff;
  margin: 50px 60px 0;
  b {
    font-size: 40px;
    margin-right: 15px;
  }

  @media (max-width: 768px) {
    margin: 30px 30px 0;
    font-size: 24px;
    b {
      font-size: 28px;
    }
  }

  @media (max-width: 480px) {
    margin: 20px 20px 0;
    font-size: 20px;
    b {
      font-size: 24px;
    }
  }
`;

const Movies = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 50px;
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 0 30px;
    gap: 20px;
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
    margin-top: 20px;
  }
`;

const Movie = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  cursor: pointer;
  position: relative;
`;
const MovieImgWrap = styled.div`
  width: 100%;
  aspect-ratio: 2/3;
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.3s;
  &:hover {
    border: 5px solid #fff;
  }

  @media (max-width: 480px) {
    &:hover {
      border: 3px solid #fff;
    }
  }
`;
const NoImg = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.gray.lighter};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${(props) => props.theme.white.darker};
`;
const MovieImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;
const MovieInfo = styled.div`
  width: 100%;
  color: ${(props) => props.theme.white.darker};
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 5px;
`;
const MovieTitle = styled.h4`
  font-size: 20px;
  margin-bottom: 8px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
const MovieDate = styled.div``;
const MovieValue = styled.div``;
const Generes = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: ${(props) => props.theme.white.darker};
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  span {
    padding: 2px 6px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.black.darker};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    span {
      padding: 1px 4px;
    }
  }
`;

const MovieRate = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;

  span {
    color: ${(props) => props.theme.blue};
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const PaginationContainer = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;

  .pagination {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding: 0 20px;
  }

  .pagination li {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border: 2px solid ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.white.darker};
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.white.darker};
      color: ${(props) => props.theme.black.darker};
    }

    &.active {
      background-color: ${(props) => props.theme.white.darker};
      color: ${(props) => props.theme.black.darker};
    }

    @media (max-width: 480px) {
      width: 25px;
      height: 25px;
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    margin: 30px 0;
  }
`;

const Search = () => {
  const navigate = useNavigate();
  const movieMatch = useMatch("/home/search/movies/:movieId");
  const { scrollY } = useScroll();

  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");

  const { data: movieData, isLoading: movieLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["multiContents", keyword],
      queryFn: () => searchContents(keyword),
    });
  const { data: genereData, isLoading: genereLoading } = useQuery({
    queryKey: ["getGeneres"],
    queryFn: searchGeneres,
  });

  const { data: reviewsData } = useQuery({
    queryKey: ["getReviews", movieData?.results.map((movie) => movie.id)],
    queryFn: () =>
      movieData?.results
        ? Promise.all(movieData.results.map((movie) => getReviews(movie.id)))
        : Promise.resolve([]),
    enabled: !!movieData?.results,
  });

  const { data: videosData } = useQuery({
    queryKey: ["getVideos", movieData?.results.map((movie) => movie.id)],
    queryFn: () =>
      movieData?.results
        ? Promise.all(movieData.results.map((movie) => getVideos(movie.id)))
        : Promise.resolve([]),
    enabled: !!movieData?.results,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movieData?.results.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/home/search/movies/${movieId}?keyword=${keyword}`);
  };

  const onOverlayClick = () => {
    navigate(`/home/search?keyword=${keyword}`);
  };

  const clickedMovie =
    movieMatch?.params.movieId &&
    movieData?.results.find(
      (movie) => String(movie.id) === movieMatch.params.movieId
    );

  return (
    <>
      {movieLoading ? (
        <div>Loading...</div>
      ) : (
        <Wrapper>
          <Header />
          <SearchTitle>
            <b>"{keyword}"</b>검색 결과
          </SearchTitle>
          <Movies>
            {currentItems?.map((movie, i) => (
              <Movie
                key={i}
                onClick={() => onBoxClicked(movie.id)}
                layoutId={String(movie.id)}
              >
                <MovieImgWrap>
                  {movie.poster_path || movie.backdrop_path ? (
                    <MovieImg
                      src={
                        movie.poster_path
                          ? makeImagePath(movie.poster_path)
                          : makeImagePath(movie.backdrop_path)
                      }
                      alt="movieImg"
                    />
                  ) : (
                    <NoImg>No Image</NoImg>
                  )}
                  <Generes>
                    {movie.genre_ids.map((id) => (
                      <span key={id}>
                        {
                          genereData?.genres.find(
                            (genre: GeneresItem) => genre.id === id
                          )?.name
                        }
                      </span>
                    ))}
                  </Generes>
                </MovieImgWrap>
                <MovieInfo>
                  <MovieTitle>{movie.title || movie.original_title}</MovieTitle>
                  <MovieDate>개봉일: {movie.release_date}</MovieDate>
                  <MovieValue>{movie.adult ? "+18" : "ALL"}</MovieValue>
                  <MovieRate>
                    <span>평점:</span> {movie.vote_average?.toFixed(2)} /{" "}
                    <span>Members:</span>{" "}
                    {movie.vote_count?.toLocaleString("ko-kr")}
                  </MovieRate>
                </MovieInfo>
              </Movie>
            ))}
          </Movies>
          <PaginationContainer>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={movieData?.results.length || 0}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </PaginationContainer>

          <AnimatePresence>
            {movieMatch && clickedMovie && (
              <MovieModal
                movie={clickedMovie}
                onOverlayClick={onOverlayClick}
                layoutId={String(clickedMovie.id)}
                scrollY={scrollY.get()}
                reviewsData={reviewsData || []}
                videosData={videosData || []}
              />
            )}
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
};

export default Search;
