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
