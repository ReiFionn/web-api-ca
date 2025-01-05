import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { updateMustWatchMovies } from "../../api/tmdb-api";

const RemoveFromMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext)

  const handleRemoveFromMustWatch = async (e) => {
    e.preventDefault();
    try {
      const updatedMustWatchMovies = context.mustWatch.filter((id) => id !== movie.id);
      context.removeFromMustWatch(movie);
      const response = await updateMustWatchMovies(authContext.userName, updatedMustWatchMovies);
      console.log(response);
    } catch (error) {
      console.error("Error updating must watch movies:", error);
    }
  };

  return (
    <IconButton
      aria-label="remove from must watch"
      onClick={handleRemoveFromMustWatch}
    >
      <AutoDeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;