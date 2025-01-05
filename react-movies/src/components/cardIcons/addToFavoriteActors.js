import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import { AuthContext } from "../../contexts/authContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateFavouriteActors } from "../../api/tmdb-api";

const AddToFavoriteActorsIcon = ({ actor }) => {
  const context = useContext(ActorsContext);
  const authContext = useContext(AuthContext)

  const handleAddToFavoriteActors = async (e) => {
    e.preventDefault();
    try {
      const updatedFavorites = [...context.favoriteActors, actor.id];
      context.addToFavoriteActors(actor);
      const response = await updateFavouriteActors(authContext.userName, updatedFavorites);
      console.log(response);
    } catch (error) {
      console.error("Error updating favorite actors:", error);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavoriteActors}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoriteActorsIcon;