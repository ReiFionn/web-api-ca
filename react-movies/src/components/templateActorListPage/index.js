import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterActorsCard";
import ActorList from "../actorList";
import Grid from "@mui/material/Grid2";

function ActorListPageTemplate({ actors, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [popularityFilter, setPopularityFilter] = useState([0, 300 ]);

  let displayedActors = actors
    .filter((m) => m.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => m.popularity >= popularityFilter[0] && m.popularity <= popularityFilter[1]);

    const handleChange = (type, value) => {
      if (type === "name") {
        setNameFilter(value);
      } else {
        setPopularityFilter(value);
      }
    };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            popularityFilter={popularityFilter}
          />
        </Grid>
        <ActorList action={action} actors={displayedActors}></ActorList>
      </Grid>
    </Grid>
  );
}
export default ActorListPageTemplate;