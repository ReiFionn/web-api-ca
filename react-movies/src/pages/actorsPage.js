import React, { useState } from "react";
import { getActors } from "../api/tmdb-api";
import PageTemplate from '../components/templateActorListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoriteActorsIcon from '../components/cardIcons/addToFavoriteActors';
import { Pagination } from "@mui/material";

const ActorsPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {  data, error, isLoading, isError }  = useQuery(['actors', currentPage], () => getActors(currentPage));

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const actors = data.results.slice(0,17); //limit the number of actors on a page
  const totalPages = Math.ceil(data.total_results/17); //total number of pages needed to fit all the actors, if the limit of 17 actors per page is applied

  // Redundant, but necessary to avoid app crashing.
  const favoriteActors = actors.filter(a => a.favorite)
  localStorage.setItem('favoriteActors', JSON.stringify(favoriteActors))
  const addToFavoriteActors = (actorId) => true 

  return (
    <>
      <PageTemplate
        title="Discover Actors"
        actors={actors}
        action={(actor) => {
          return <AddToFavoriteActorsIcon actor={actor} />
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
export default ActorsPage;