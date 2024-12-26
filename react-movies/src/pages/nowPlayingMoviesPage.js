import React, { useState } from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Pagination } from "@mui/material";

const NowPlayingMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {  data, error, isLoading, isError }  = useQuery(['now_playing', currentPage], () => getNowPlayingMovies(currentPage))

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const movies = data.results.slice(0,17); //limit the number of movies on a page
  const totalPages = Math.ceil(data.total_results/17); //total number of pages needed to fit all the movies, if the limit of 17 actors per page is applied

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = movies.filter(m => m.mustWatch)
  localStorage.setItem('mustWatch', JSON.stringify(mustWatch))
  const addToMustWatch = (movieId) => true 

  return (
    <>
    <PageTemplate
      title="Movies Playing in Theatres Now"
      movies={movies}
      action={(movie) => {
        return <>
          <AddToMustWatchIcon movie={movie} />
          <AddToFavoritesIcon movie={movie} />
        </>
      }}
    />
    <Pagination
        style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
        count={totalPages}
        color="secondary"
        onChange={handlePageChange}
        page={currentPage}
        size="large"
    />
    </>
);
};
export default NowPlayingMoviesPage;