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
  const {  data, error, isLoading, isError, refetch }  = useQuery(['now_playing', {page: currentPage}], () => getNowPlayingMovies({queryKey: ['now_playing', {page: currentPage}]}));

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  

  const movies = data.results;
  
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    refetch();
  };

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
    <Pagination style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }} count={500} color="secondary" onChange={handlePageChange} page={currentPage} size="large"/>
    </>
);
};
export default NowPlayingMoviesPage;