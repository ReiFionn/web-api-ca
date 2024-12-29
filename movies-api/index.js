import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';
import actorRouter from './api/actors';
import genreRouter from './api/genres';
import topRatedRouter from './api/movies/toprated';
import upcomingRouter from './api/movies/upcoming';
import nowPlayingRouter from './api/movies/nowplaying';
import authenticate from './authenticate';

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
// app.use('/api/movies', authenticate, moviesRouter);
// app.use('/api/actors', authenticate, actorRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/actors', actorRouter);
app.use('/api/genres', genreRouter);
app.use('/api/movies/upcoming', upcomingRouter);
app.use('/api/movies/toprated', topRatedRouter);
app.use('/api/movies/nowplaying', nowPlayingRouter);

app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
