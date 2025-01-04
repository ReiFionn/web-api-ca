import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import { Pagination } from "@mui/material";

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {  data, error, isLoading, isError }  = useQuery(['discover', {page: currentPage}], getMovies);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  } 

  const movies = data.results;
  const totalPages = data.total_pages;


  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true 

  return (
    <>
    <PageTemplate
      title="Discover Movies"
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
export default HomePage;