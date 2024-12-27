import React, { useContext, useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';

const SignInPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
      context.authenticate(userName, password);
  };

  let location = useLocation();

  // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  if (context.isAuthenticated === true) {
      return <Navigate to={from} />;
  }

  // return (
  //   <Container component="main" maxWidth="xs">
  //     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
  //       <Typography variant="h5" sx={{ marginBottom: 2 }}>
  //         Sign In
  //       </Typography>
  //       <form onSubmit={handleSignIn} noValidate>
  //         <TextField
  //           variant="outlined"
  //           margin="normal"
  //           required
  //           fullWidth
  //           label="Email Address"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           autoFocus
  //         />
  //         <TextField
  //           variant="outlined"
  //           margin="normal"
  //           required
  //           fullWidth
  //           label="Password"
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //         <Button
  //           type="submit"
  //           fullWidth
  //           variant="contained"
  //           color="primary"
  //           sx={{ marginTop: 2 }}
  //         >
  //           Sign In
  //         </Button>
  //         <Grid container>
  //           <Grid item>
  //             <Button onClick={() => navigate('/signup')} sx={{ marginTop: 2 }}>
  //               Don't have an account? Sign Up
  //             </Button>
  //           </Grid>
  //         </Grid>
  //       </form>
  //     </Box>
  //   </Container>
  // );

  return (
    <>
        <h2>Login page</h2>
        <p>You must log in to view the protected pages </p>
        <input id="username" placeholder="user name" onChange={e => {
            setUserName(e.target.value);
        }}></input><br />
        <input id="password" type="password" placeholder="password" onChange={e => {
            setPassword(e.target.value);
        }}></input><br />
        {/* Login web form  */}
        <button onClick={login}>Log in</button>
        <p>Not Registered?
            <Link to="/signup">Sign Up!</Link></p>
    </>
);
};
export default SignInPage;

//https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
//https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01