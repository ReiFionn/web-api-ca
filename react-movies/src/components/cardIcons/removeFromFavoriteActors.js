import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActorsContext } from "../../contexts/actorsContext";
import { AuthContext } from "../../contexts/authContext";
import { updateFavouriteActors } from "../../api/tmdb-api";

const RemoveFromFavoriteActorsIcon = ({ actor }) => {
  const context = useContext(ActorsContext);
  const authContext = useContext(AuthContext)

  const handleRemoveFromFavoriteActors = async (e) => {
      e.preventDefault();
      try {
        const updatedFavorites = context.favoriteActors.filter((id) => id !== actor.id);
        context.removeFromFavoriteActors(actor);
        const response = await updateFavouriteActors(authContext.userName, updatedFavorites);
        console.log(response);
      } catch (error) {
        console.error("Error updating favorite actors:", error);
      }
    };

  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavoriteActors}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoriteActorsIcon;