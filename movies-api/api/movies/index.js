import imagesRouter from './images';
import castRouter from './cast'
import reviewsRouter from './reviews';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getMovies, getMovie, getUpcomingMovies, getTopRatedMovies, getNowPlayingMovies} from '../tmdb-api';  

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query; // destructure page and limit and set default values
    [page] = [+page]; //trick to convert to numeric (req.query will contain string values)

    try {
        const movies = await getMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query; // destructure page and limit and set default values
    [page] = [+page]; //trick to convert to numeric (req.query will contain string values)

    try {
        const movies = await getUpcomingMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        res.status(500).json({ error: 'Failed to fetch upcoming movies' });
    }
}));

router.get('/toprated', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query; // destructure page and limit and set default values
    [page] = [+page]; //trick to convert to numeric (req.query will contain string values)

    try {
        const movies = await getTopRatedMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        res.status(500).json({ error: 'Failed to fetch top rated movies' });
    }
}));

router.get('/nowplaying', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query; // destructure page and limit and set default values
    [page] = [+page]; //trick to convert to numeric (req.query will contain string values)

    try {
        const movies = await getNowPlayingMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        res.status(500).json({ error: 'Failed to fetch now playing movies' });
    }
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.use('/images', imagesRouter);
router.use('/reviews', reviewsRouter);
router.use('/cast', castRouter)

export default router;
