import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { updateMustWatchMovies } from "../../api/tmdb-api";

const AddToMustWatchIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const authContext = useContext(AuthContext)

    const handleAddToMustWatch = async (e) => {
        e.preventDefault();
        try {
        const updatedMustWatchMovies = [...context.mustWatch, movie.id];
        context.addToMustWatch(movie);
        const response = await updateMustWatchMovies(authContext.userName, updatedMustWatchMovies);
        console.log(response);
        } catch (error) {
        console.error("Error updating must watch movies:", error);
        }
    };

    return (
        <IconButton aria-label="add to playlist" onClick={handleAddToMustWatch}>
        <PlaylistIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToMustWatchIcon;