import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { GetMoviesResult, searchContents, searchGeneres } from "../api";
import { useQuery } from "@tanstack/react-query";
import { makeImagePath } from "../utils";
import Pagination from "react-js-pagination";
import { useState } from "react";
import Header from "../components/Header";

interface GeneresItem {
  id: number;
  name: string;
}

const Wrapper = styled.div`
  padding: 60px 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.black.lighter};
`;
const SearchTitle = styled.h2`
  font-size: 30px;
  color: #fff;
  margin-left: 100px;
  margin-top: 50px;
  b {
    font-size: 40px;
    margin-right: 15px;
  }
`;

const Movies = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 50px;
  padding: 0 60px;
`;

const Movie = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  cursor: pointer;
  position: relative;
`;
const MovieImgWrap = styled.div`
  width: 300px;
  height: 450px;
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.3s;
  &:hover {
    border: 7px solid #fff;
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
    scale: 1.1;
  }
`;
const MovieInfo = styled.div`
  width: 300px;
  height: 150px;
  color: ${(props) => props.theme.white.darker};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const MovieTitle = styled.h4`
  font-size: 22px;
  margin-bottom: 10px;
`;
const MovieDate = styled.div``;
const MovieValue = styled.div``;
const Generes = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: ${(props) => props.theme.white.darker};
  font-size: 14px;
  span {
    padding: 2px 6px;
    border-radius: 4px;
    margin-right: 6px;
    background-color: ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.black.darker};

    font-weight: 600;
  }
`;

const MovieRate = styled.div``;

const PaginationContainer = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  .pagination {
    display: flex;
    gap: 10px;
  }
  .pagination li {
    display: inline-block;
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
  }
`;

const Search = () => {
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");
  const content = searchContents(keyword);
  console.log(content);

  const { data: movieData, isLoading: movieLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["multiContents", keyword],
      queryFn: () => searchContents(keyword),
    });
  const { data: genereData, isLoading: genereLoading } = useQuery({
    queryKey: ["getGeneres"],
    queryFn: searchGeneres,
  });

  // const ids = mobieData?.results.map((movie) => movie.id);
  // const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
  //   queryKey: ["getReviews", ids],
  //   queryFn: () =>
  //     ids ? Promise.all(ids.map((id) => getReviews(id))) : Promise.resolve([]),
  //   enabled: !!ids,
  // });
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
              <Movie key={i}>
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
        </Wrapper>
      )}
    </>
  );
};

export default Search;
