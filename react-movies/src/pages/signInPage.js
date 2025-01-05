import React, { useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { ActorsContext } from '../contexts/actorsContext'
import { MoviesContext} from '../contexts/moviesContext'
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { getFavouriteActors, getFavouriteMovies, getMustWatchMovies } from '../api/tmdb-api';

const SignInPage = () => {
  const context = useContext(AuthContext);
  const actorsContext = useContext(ActorsContext)
  const moviesContext = useContext(MoviesContext)

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await context.authenticate(userName, password);
    } catch (error) {
      alert(error.message);  
      return;
    }
  
    try {
      const actors = await getFavouriteActors(userName)
      const actorIds = actors.actor_ids;
      actorsContext.addToFavoriteActorsFromAtlas(actorIds);
    } catch (error) {
      console.error("Error getting favourite actors: ", error);
    }
    
    try {
      const movies = await getFavouriteMovies(userName)
      const movieIds = movies.movie_ids
      moviesContext.addToFavoriteMoviesFromAtlas(movieIds)
    } catch (error) {
      console.error("Error getting favourite movies: ", error);
    }
    
    try {
      const mustWatch = await getMustWatchMovies(userName)
      const mustWatchIds = mustWatch.movie_ids
      moviesContext.addToMustWatchFromAtlas(mustWatchIds)
    } catch (error) {
      console.error("Error getting must watch movies: ", error);
    }
  };

  let location = useLocation();

  // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  if (context.isAuthenticated === true) {
      return <Navigate to={from} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Sign In</Typography>
        <p>You must log in to view the protected pages</p>
        <TextField variant="outlined" margin="normal" required fullWidth label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} autoFocus/>
        <TextField variant="outlined" margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={login} fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>Log In</Button>
        <Grid container>
          <Grid item>
            <Button onClick={() => navigate('/signup')} sx={{ marginTop: 2 }}>Don't have an account? Sign Up</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
  
};
export default SignInPage;

//https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
//https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01