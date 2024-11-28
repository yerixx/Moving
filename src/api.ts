const API_KEY = "c6db9265f1f1a633774abda372c0b746";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  adult: boolean;
  genre_ids: number[];
  popularity: number;
}

export interface GetMoviesResult {
  dates: {
    maximum: string;
    minimun: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface GetReviewsResult {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  id: string;
  url: string;
}

export const getMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};
export const getTodayMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};

export const searchContents = (keyword: string | null) => {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&language=ko-KR`
  ).then((response) => response.json());
};

export const searchGeneres = () => {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};

export const getReviews = (movieId: number) => {
  return fetch(`${BASE_PATH}/movie/${movieId}/reviews?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getVideos = (movieId: number) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};

// TV 프로그램 인터페이스
export interface ITv {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  popularity: number;
  genre_ids: number[];
}

export interface ITvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

// 인기 TV 프로그램
export function getPopularTv() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

// 최신 TV 프로그램 (방영중)
export function getOnTheAirTv() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

// 높은 평점의 TV 프로그램
export function getTopRatedTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

// TV 프로그램 리뷰
export function getTvReviews(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId}/reviews?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// TV 프로그램 비디오
export function getTvVideos(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
