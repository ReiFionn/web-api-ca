import React, { useContext, useState } from "react";
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault()

    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      alert("Password must be at least 8 characters long, include one letter, one number, and one special character.");
      return;
    }

    if (password !== passwordAgain) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    if (validPassword && password === passwordAgain) {
      context.register(userName, password).then((isRegistered) => {
        if (isRegistered) {
          setRegistered(true);
          alert("Register successful! Sign in to continue...")
        } else {
          alert("Register unsuccessful. Username has already been taken.")
        }
      })
    } else {
      alert("Register unsuccessful.")
    }
  }

  if (registered === true) {
    return <Navigate to="/signin" />;
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Sign Up
        </Typography>
        <p>You must register a username and password to log in</p>
        <form onSubmit={register}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password Again"
            type="password"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={() => navigate('/signin')} sx={{ marginTop: 2 }}>
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default SignUpPage;
