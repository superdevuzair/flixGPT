import * as React from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

export interface NowPlayingInterface {
  dates: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    const results: NowPlayingInterface = await response.json();
    dispatch(addNowPlayingMovies(results.results));
  };

  React.useEffect(() => {
    getNowPlayingMovies();
  }, []);
};
