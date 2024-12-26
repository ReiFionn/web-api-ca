import React, { useContext } from "react";
import PageTemplate from "../components/templateActorListPage";
import { ActorsContext } from "../contexts/actorsContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavoriteActors from "../components/cardIcons/removeFromFavoriteActors";

const FavoriteActorsPage = () => {
  const {favoriteActors: actorIds } = useContext(ActorsContext);

  // Create an array of queries and run in parallel.
  const favoriteActorQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["actor", { id: actorId }],
        queryFn: getActor,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteActorQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const actors = favoriteActorQueries.map((q) => {
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Favorite Actors"
      actors={actors}
      action={(actor) => {
        return (
          <>
            <RemoveFromFavoriteActors actor={actor} />
          </>
        );
      }}
    />
  );
};

export default FavoriteActorsPage;