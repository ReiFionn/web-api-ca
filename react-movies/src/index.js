import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
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
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";


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

const App = () => {

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthContextProvider>
          <SiteHeader />
            <MoviesContextProvider>
              <ActorsContextProvider>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/movies/favorites" element={<FavoriteMoviesPage />}/>
                    <Route path="/movies/upcoming" element={<UpcomingMoviesPage />}/>
                    <Route path="/movies/nowplaying" element={<NowPlayingMoviesPage />}/>
                    <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />}/>
                    <Route path="/movies/toprated" element={<TopRatedMoviesPage />}/>
                    <Route path="/reviews/:id" element={<MovieReviewPage />}/>
                    <Route path="/movies/:id" element={<MoviePage />}/>
                    <Route path="/actors" element={<ActorsPage />}/>
                    <Route path="/actors/favorites" element={<FavoriteActorsPage />}/>
                    <Route path="/actors/:id" element={<ActorDetailPage />}/>
                    <Route path="/reviews/form" element={<AddMovieReviewPage />}/>
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ActorsContextProvider>
            </MoviesContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

//https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01