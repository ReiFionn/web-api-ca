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
  const {  data, error, isLoading, isError }  = useQuery(['discover', currentPage], () => getMovies(currentPage))

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
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

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
export default HomePage;