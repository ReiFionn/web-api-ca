import express from 'express';
import FavouriteMovieModel from './movies/favouriteMoviesModel';
import FavouriteActorModel from './actors/favouriteActorsModel';
import asyncHandler from 'express-async-handler';
import actorsRouter from './actors';
import moviesRouter from './movies'

const router = express.Router(); // eslint-disable-line

router.get('/movies', async (req, res) => {
    const movies = await FavouriteMovieModel.findByUsername();
    res.status(200).json(movies);
});

router.get('/actors', async (req, res) => {
    const actors = await FavouriteActorModel.findByUsername();
    res.status(200).json(actors);
});

router.use('/movies', moviesRouter);
router.use('/actors', actorsRouter);

export default router;