
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";


const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = useCallback(async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  }, [dispatch]); // Include only the dependencies needed by the function

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  return getPopularMovies;
};


export default usePopularMovies;
