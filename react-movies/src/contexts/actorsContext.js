import React, { useState } from "react";

export const ActorsContext = React.createContext(null);

const ActorsContextProvider = (props) => {
  const [favoriteActors, setFavoriteActors] = useState( [] )

  const addToFavoriteActors = (actor) => {
    let newFavoriteActors = [];
    if (!favoriteActors.includes(actor.id)){
        newFavoriteActors = [...favoriteActors, actor.id];
    }
    else{
        newFavoriteActors = [...favoriteActors];
    }
    setFavoriteActors(newFavoriteActors)
  };
  console.log(favoriteActors)
  
  const removeFromFavoriteActors = (actor) => {
    setFavoriteActors( favoriteActors.filter(
      (mId) => mId !== actor.id
    ) )
  };

  return (
    <ActorsContext.Provider
      value={{
        favoriteActors,
        addToFavoriteActors,
        removeFromFavoriteActors,
      }}
    >
      {props.children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;