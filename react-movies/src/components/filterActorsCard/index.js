import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import img from '../../images/kitten bubble.jpg';
import { getActors } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Slider from '@mui/material/Slider';
import StarRateIcon from "@mui/icons-material/StarRate";


const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "#0B0B0E"
  };

export default function FilterActorsCard(props) {
  const {  data, error, isLoading, isError }  = useQuery(['actors', 1], getActors(1));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleSliderChange = (e, props) => {
    handleChange(e, "popularity", e.target.value);
  };

  return (
    <Card 
    sx={{
      backgroundColor: "#0B0B0E",
      color: "#FFFFFF",
    }}
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the actors.
        </Typography>
        <TextField
            sx={{...formControl}}
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            value={props.titleFilter}
            onChange={handleTextChange}
        />
        <Typography variant="h6" component="h4">
          <StarRateIcon fontSize="small" />
          Popularity
        </Typography>
        <Slider
          value={props.popularityFilter}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={300}
        />
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the actors.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}