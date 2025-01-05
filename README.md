# Assignment 2 - Web API.

Name: Fionn Reilly

## Features.

- All fetches are made through the custom API
- Users, favouriteMovies, favouriteActors and mustWatch collections in MongoDB
- Retains favourites and must watch for each user (when the user logs back in they will see the same lists)
- Sign up and sign in validation including unique usernames, displaying errors using alerts
- Protected routes added on most pages that require user authentication

## Setup requirements.

- Clone the repository and run `npm install` to install dependencies
- Run `npm start` in the react-movies directory
- Run `npm run dev` in the movies-api directory to load some data to test the website on, or `npm start` to start fresh

## API Configuration

Create an `.env` file in both directories:

movies-api/.env
______________________
+ NODEENV=development
+ PORT=8080
+ HOST=localhost
+ mongoDB=YOUR_MONGO_URL
+ TMDB_KEY=YOUR_TMDB_KEY
+ secret=YOUR_JWT_SECRET
______________________

react-movies/.env
______________________
+ REACT_APP_TMDB_KEY=YOUR_TMDB_KEY
+ FAST_REFRESH=false
______________________

## API Design

An overview of the web API design:

### Actors
- /api/actors | GET | Returns all actors from TMDB
- /api/actors/{id} | GET | Returns an actor by ID
- /api/actors/images/{id} | GET | Returns images for an actor
- /api/actors/roles/{id} | GET | Returns roles for an actor

### Favourites
- /api/favourites/movies | GET | Returns all favourited movies
- /api/favourites/actors | GET | Returns all favourited actors
- /api/favourites/movies/{id} | GET | Returns favourited movies for a specific user
- /api/favourites/movies/{id} | PUT | Adds or removes movies from a user's favourites
- /api/favourites/actors/{id} | GET | Returns favourited actors for a specific user
- /api/favourites/actors/{id} | PUT | Adds or removes actors from a user's favourites

### Genres
- /api/genres | GET | Returns genres from the TMDB discover page

### Movies
- /api/movies | GET | Returns movies from the TMDB discover page
- /api/movies/upcoming | GET | Returns upcoming movies from TMDB
- /api/movies/toprated | GET | Returns top-rated movies from TMDB
- /api/movies/nowplaying | GET | Returns now-playing movies from TMDB
- /api/movies/{id} | GET | Returns a movie by ID
- /api/movies/images/{id} | GET | Returns images for a movie
- /api/movies/reviews/{id} | GET | Returns reviews for a movie
- /api/movies/cast/{id} | GET | Returns cast for a movie

### Must Watch
- /api/mustwatch | GET | Returns all must-watch movies for every user
- /api/mustwatch/{id} | GET | Returns must-watch movies for a specific user
- /api/mustwatch/{id} | PUT | Adds or removes movies from a user's must-watch list

### Users
- /api/users | GET | Returns a list of all registered users
- /api/users | POST | Registers or authenticates a user
- /api/users/{id} | PUT | Updates user details by ID

[Swaggerhub](https://app.swaggerhub.com/apis/20101977_1/webAppAssignment2/1.0.0)

## Security and Authentication

+ Users are registered and authenticated using the /api/users post endpoint
+ Usernames must be unique and passwords must include at least 8 characters, 1 upper and lower case, number and symbol
+ Passwords are salted and hashed before being put onto Mongo to keep passwords secret and secure
+ JWT tokens used for authentication, protected routes are only accessible by authenticated users

## Integrating with React App

+ The React app is fully connected to the custom API for fetching data, updating data and managing states
+ The backend makes all calls to either TMDB or MongoDB
+ The frontend fetches through connected backend API calls
+ New collections were made in MongoDB to store user specific data (favouriteMovies, favouriteActors, mustWatch)
+ Some pages were changed from the first [assignment](https://github.com/ReiFionn/react-movie-assignment) for easier integration
