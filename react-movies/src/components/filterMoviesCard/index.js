import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/kitten bubble.jpg';
import { getGenres } from "../../api/tmdb-api"; //, getMovieCertifications
import { useQuery } from "react-query";
import Spinner from '../spinner';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "#0B0B0E"
  };

export default function FilterMoviesCard(props) {

  const { data: genreData, error: genreError, isLoading:genreIsLoading, isError:genreIsError } = useQuery("genres", getGenres);
  //const { data: certificationData, error: certificationError, isLoading:certificationIsLoading, isError:certificationIsError } = useQuery("certifications", getMovieCertifications);

  if (genreIsLoading) { //|| certificationIsLoading
    return <Spinner />;
  }

  if (genreIsError) { //|| certificationIsError
    return <h1>{(genreError).message}</h1>; //|| certificationError
  }

  const genres = genreData.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  //const certifications = certificationData.certifications.IE; //Only Irish certifications

  const handleTextChange = (e) => {
    props.onUserInput("name", e.target.value);
  };

  const handleGenreChange = (e) => {
    props.onUserInput("genre", e.target.value);
  };

  // const handleCertificationChange = (e) => {
  //   props.onUserInput("certification", e.target.value);
  // };

  const handleAdultChange = (e) => {
    props.onUserInput("adult", e.target.checked);
  };

  const handleVideoChange = (e) => {
    props.onUserInput("video", e.target.checked);
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
          Filter the movies.
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
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* <FormControl sx={{...formControl}}>
          <InputLabel id="certification-label">Certification</InputLabel>
          <Select
            labelId="certification-label"
            id="certification-select"
            defaultValue=""
            value={props.certificationFilter}
            onChange={handleCertificationChange}
          >
            {certifications.map((certification) => {
              return (
                <MenuItem key={certification.certification} value={certification.certification}>
                  {certification.certification}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
        <FormControl>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={props.adultFilter} onChange={handleAdultChange} />} label="Adult" />
            <FormControlLabel control={<Checkbox checked={props.videoFilter} onChange={handleVideoChange} />} label="Video" />
          </FormGroup>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}