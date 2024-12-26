import React, { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Grid from "@mui/material/Grid2";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function MovieCard({ movie, action, role }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const { mustWatch, addToMustWatch} = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  if (mustWatch.find((id) => id === movie.id)) {
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    addToMustWatch(movie);
  };
  
  return (
    <Card>
            <CardHeader
              avatar={
                (movie.favorite || movie.mustWatch) ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {movie.favorite && (
                      <Avatar sx={{ backgroundColor: '#426EE5' }}>
                        <FavoriteIcon />
                      </Avatar>
                    )}
                    {movie.mustWatch && (
                      <Avatar sx={{ backgroundColor: '#41ead4' }}>
                        <WatchLaterIcon />
                      </Avatar>
                    )}
                  </div>
                ) : null
              }
              title={
                <Typography variant="h5" component="p">
                    {movie.title}{" "}
                </Typography>
                }
            />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{xs: 8}}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p">
              <WorkspacePremiumIcon fontSize="small" />
              {movie.certification || "Unknown certification"}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average.toFixed(1)}{" "}
            </Typography>
          </Grid>
          {role && (
            <Grid item xs={12}>
              <Typography variant="h6" component="p">
                <SportsMartialArtsIcon fontSize="small" /> 
                  {role.character || "Unknown role"}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      
        {action(movie)}
      
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}