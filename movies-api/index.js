import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';
import actorRouter from './api/actors';
import genreRouter from './api/genres';
import favouritesRouter from './api/favourites'
import authenticate from './authenticate';

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api/actors', authenticate, actorRouter);
app.use('/api/genres', authenticate, genreRouter);
app.use('api/favourites', authenticate, favouritesRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
