import React from "react";
import Typography from "@mui/material/Typography";

const ActorRole =  ({ role }) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        {role.title} ({role.release_date ? role.release_date.slice(0, 4) : "N/A"})
      </Typography>

      <Typography variant="body1" component="p">
        Character: {role.character || "Unknown"}
      </Typography>
      
      <Typography variant="body2" component="p" color="textSecondary">
        {role.overview || "No description available."}
      </Typography>
    </>
  );
};
export default ActorRole