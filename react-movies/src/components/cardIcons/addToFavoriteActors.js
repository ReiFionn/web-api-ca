import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoriteActorsIcon = ({ actor }) => {
  const context = useContext(ActorsContext);

  const handleAddToFavoriteActors = (e) => {
    e.preventDefault();
    context.addToFavoriteActors(actor);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavoriteActors}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoriteActorsIcon;