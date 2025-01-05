import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] );
  const [mustWatch, setMustWatch] = useState( [] );
  const [myReviews, setMyReviews] = useState( {} );

  const addToMustWatchFromAtlas = (ids) => {
    setMustWatch(ids)
  }

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)) {
      newMustWatch = [...mustWatch, movie.id];
    } else {
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch)
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch( mustWatch.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  const addToFavoriteMoviesFromAtlas = (ids) => {
    setFavorites(ids)
  }

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        addToMustWatchFromAtlas,
        addToFavorites,
        addToMustWatch,
        removeFromFavorites,
        removeFromMustWatch,
        addReview,
        addToFavoriteMoviesFromAtlas
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;