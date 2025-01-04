import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Pagination } from "@mui/material";

const UpcomingMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {  data, error, isLoading, isError, refetch }  = useQuery(['upcoming', {page: currentPage}], getUpcomingMovies);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    refetch()
  };

  const movies = data.results;
  const totalPages = data.total_pages;

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = movies.filter(m => m.mustWatch)
  localStorage.setItem('mustWatch', JSON.stringify(mustWatch))
  const addToMustWatch = (movieId) => true 

  return (
    <>
    <PageTemplate
      title="Movies Coming to Theatres Soon"
      movies={movies}
      action={(movie) => {
        return <>
          <AddToMustWatchIcon movie={movie} />
          <AddToFavoritesIcon movie={movie} />
        </>
      }}
    />
    <Pagination style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }} count={totalPages} color="secondary" onChange={handlePageChange} page={currentPage} size="large"/>  
    </>
);
};
export default UpcomingMoviesPage;