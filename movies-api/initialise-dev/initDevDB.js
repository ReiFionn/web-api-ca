import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import actors from './actors';
import genres from './genres';
import toprated from './toprated';
import upcoming from './upcoming';
import nowplaying from './nowplaying';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';
import Actor from '../api/actors/actorModel';
import Genre from '../api/genres/genreModel';
import NowPlaying from '../api/movies/nowplaying/nowPlayingModel';
import TopRated from '../api/movies/toprated/topRatedModel';
import Upcoming from '../api/movies/upcoming/upcomingModel';

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    
    await mongoose.connect(process.env.MONGO_DB);

    // Drop collections
    // await User.collection.drop().catch(err => console.log('User collection not found'));
    mongoose.connection.collection('users').drop()
    // await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
    mongoose.connection.collection('movies').drop()
    // await Actor.collection.drop().catch(err => console.log('Actor collection not found'));
    mongoose.connection.collection('actors').drop()
    // await Genre.collection.drop().catch(err => console.log('Genre collection not found'));
    mongoose.connection.collection('genres').drop()
    // await NowPlaying.collection.drop().catch(err => console.log('NowPlaying collection not found'));
    mongoose.connection.collection('nowplayings').drop()
    // await TopRated.collection.drop().catch(err => console.log('TopRated collection not found'));
    mongoose.connection.collection('toprateds').drop()
    // await Upcoming.collection.drop().catch(err => console.log('Upcoming collection not found'));
    mongoose.connection.collection('upcomings').drop()

    // await User.create(users);
    // await Movie.create(movies);
    // await Actor.create(actors);
    // await Genre.create(genres);
    // await NowPlaying.create(nowplaying);
    // await TopRated.create(toprated);
    // await Upcoming.create(upcoming);

    console.log('Database initialised');

    console.log(`${users.length} users loaded`);
    console.log(`${movies.length} movies loaded`);
    console.log(`${actors.length} actors loaded`);
    console.log(`${genres.length} genres loaded`);
    console.log(`${nowplaying.length} now playing movies loaded`);
    console.log(`${toprated.length} top rated movies loaded`);
    console.log(`${upcoming.length} upcoming movies loaded`);

    await mongoose.disconnect();
}

main();
