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
  
    const register = () => {
      let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      const validPassword = passwordRegEx.test(password);
  
      if (validPassword && password === passwordAgain) {
        context.register(userName, password);
        setRegistered(true);
      }
    }
  
    if (registered === true) {
      return <Navigate to="/signin" />;
    }

// return (
//     <>
//       <h2>SignUp page</h2>
//       <p>You must register a username and password to log in </p>
//       <input value={userName} placeholder="user name" onChange={e => {
//         setUserName(e.target.value);
//       }}></input><br />
//       <input value={password} type="password" placeholder="password" onChange={e => {
//         setPassword(e.target.value);
//       }}></input><br />
//       <input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
//         setPasswordAgain(e.target.value);
//       }}></input><br />
//       {/* Login web form  */}
//       <button onClick={register}>Register</button>
//     </>
//   );
// };

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

//https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
//https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01