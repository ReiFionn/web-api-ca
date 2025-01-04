import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies'
import favouriteActors from './favouriteActors';
import favouriteMovies from './favouriteMovies';
import mustWatchMovies from './mustWatchMovies';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel'
import FavouriteActors from '../api/favourites/actors/favouriteActorsModel'
import FavouriteMovies from '../api/favourites/movies/favouriteMoviesModel'
import MustWatchMovies from '../api/mustwatch/mustWatchModel'

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    
    await mongoose.connect(process.env.MONGO_DB);

    // Drop collections
    await User.collection.drop().catch(err => console.log('User collection not found'));
    await Movie.collection.drop().catch(err => console.log('Movie collection not found'))
    await FavouriteActors.collection.drop().catch(err => console.log('FavouriteActors collection not found'))
    await FavouriteMovies.collection.drop().catch(err => console.log('FavouriteMovies collection not found'))
    await MustWatchMovies.collection.drop().catch(err => console.log('MustWatchMovies collection not found'))

    await User.create(users);
    await Movie.create(movies)
    await FavouriteActors.create(favouriteActors)
    await FavouriteMovies.create(favouriteMovies)
    await MustWatchMovies.create(mustWatchMovies)

    console.log('Database initialised');

    console.log(`${users.length} users loaded`);
    console.log(`${movies.length} movies loaded`);
    console.log(`${favouriteActors.length} favourite actors loaded`);
    console.log(`${favouriteMovies.length} favourite movies loaded`);
    console.log(`${mustWatchMovies.length} must watch movies loaded`);

    await mongoose.disconnect();
}

main();