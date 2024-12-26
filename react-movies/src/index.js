import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import ActorsPage from "./pages/actorsPage";
import ActorDetailPage from "./pages/actorDetailsPage";
import ActorsContextProvider from "./contexts/actorsContext";
import FavoriteActorsPage from "./pages/favoriteActorsPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import Spinner from './components/spinner';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const myTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5B21D9',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#41ead4',
      contrastText: '#0B0B0E',
    },
    background: {
      default: '#0B0B0E',
      paper: '#4F50C1',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#426EE5', 
    },
    divider: '#426EE5', 
  },
  typography: {
    h1: { color: '#FFFFFF' }, 
    h2: { color: '#FFFFFF' },
    body1: { color: '#FFFFFF' }, 
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed: ", user);
      setCurrentUser(user);
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  

  if (loading) {
    return <Spinner />
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

const App = () => {

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <ActorsContextProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/movies/favorites" element={<ProtectedRoute><FavoriteMoviesPage /></ProtectedRoute>}/>
                <Route path="/movies/upcoming" element={<ProtectedRoute><UpcomingMoviesPage /></ProtectedRoute>}/>
                <Route path="/movies/nowplaying" element={<ProtectedRoute><NowPlayingMoviesPage /></ProtectedRoute>}/>
                <Route path="/movies/mustwatch" element={<ProtectedRoute><MustWatchMoviesPage /></ProtectedRoute>}/>
                <Route path="/movies/toprated" element={<ProtectedRoute><TopRatedMoviesPage /></ProtectedRoute>}/>
                <Route path="/reviews/:id" element={<ProtectedRoute><MovieReviewPage /></ProtectedRoute>}/>
                <Route path="/movies/:id" element={<ProtectedRoute><MoviePage /></ProtectedRoute>}/>
                <Route path="/actors" element={<ProtectedRoute><ActorsPage /></ProtectedRoute>}/>
                <Route path="/actors/favorites" element={<ProtectedRoute><FavoriteActorsPage /></ProtectedRoute>}/>
                <Route path="/actors/:id" element={<ProtectedRoute><ActorDetailPage /></ProtectedRoute>}/>
                <Route path="/reviews/form" element={<ProtectedRoute><AddMovieReviewPage /></ProtectedRoute>}/>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ActorsContextProvider>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

//https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01