import express from 'express';
import FavouriteMovie from './movies/favouriteMoviesModel';
import FavouriteActor from './actors/favouriteActorsModel';
import actorsRouter from './actors';
import moviesRouter from './movies'

const router = express.Router(); // eslint-disable-line

router.get('/movies', async (req, res) => {
    const movies = await FavouriteMovie.find();
    res.status(200).json(movies);
});

router.get('/actors', async (req, res) => {
    const actors = await FavouriteActor.find();
    res.status(200).json(actors);
});

router.use('/movies', moviesRouter);
router.use('/actors', actorsRouter);

export default router;