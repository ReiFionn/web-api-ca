import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActorsContext } from "../../contexts/actorsContext";

const RemoveFromFavoriteActorsIcon = ({ actor }) => {
  const context = useContext(ActorsContext);

  const handleRemoveFromFavoriteActors = (e) => {
    e.preventDefault();
    context.removeFromFavoriteActors(actor);
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