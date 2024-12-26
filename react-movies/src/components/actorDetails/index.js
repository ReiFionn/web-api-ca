import React, { useEffect, useState } from "react";
import { getActorRoles } from "../../api/tmdb-api";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import PopularityIcon from "@mui/icons-material/Whatshot";
import Typography from "@mui/material/Typography";
import AddToFavoritesIcon from '../cardIcons/addToFavorites';
import MovieCard from '../movieCard';
import AddToMustWatchIcon from '../cardIcons/addToMustWatch'

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const ActorDetails = ({ actor }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getActorRoles(actor.id).then((roles) => {
      setRoles(roles);
    });
  }, [actor.id]);

  const action = (role) => {
    return <>
        <AddToMustWatchIcon movie={role} />
        <AddToFavoritesIcon movie={role} />
    </>
  };

  return (
    <>
      <Typography variant="h5" component="h3">
        Actor Information
      </Typography>

      <Typography variant="h6" component="p">
        Name: {actor.name}
      </Typography>

      <Typography variant="h6" component="p">
        Biography: {actor.biography || "Biography not available."}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<CakeIcon />} label={`Born: ${actor.birthday || "Unknown"}`} />
        {actor.deathday && (
          <Chip icon={<AccessTimeIcon />} label={`Died: ${actor.deathday}`} />
        )}
        <Chip
          icon={<PlaceIcon />}
          label={`Place of Birth: ${actor.place_of_birth || "Unknown"}`}
        />
        <Chip icon={<PopularityIcon />} label={`Popularity: ${actor.popularity.toFixed(1)}`} />
        <Chip label={`Department: ${actor.known_for_department || "N/A"}`} />
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Also Known As" sx={{ ...chip }} color="primary" />
        </li>
        {actor.also_known_as && actor.also_known_as.length > 0 ? (
          actor.also_known_as.map((aka, index) => (
            <li key={index}>
              <Chip label={aka} sx={{ ...chip }} />
            </li>
          ))
        ) : (
          <Chip label="No alternative names" sx={{ ...chip }} />
        )}
      </Paper>

      <Typography variant="h5" component="h3">Known Roles</Typography>

      <Grid container spacing={2}>
        {roles.map((role) => (
          <Grid item key={role.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={role} action={action} role={role} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ActorDetails;
