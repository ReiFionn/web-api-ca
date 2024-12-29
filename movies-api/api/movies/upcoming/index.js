import movieModel from '../movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getUpcomingMovies, getMovieImages, getMovieReviews, getMovieCast, getCertifications} from '../../tmdb-api';  

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

// Get movie images
router.get('/:id/images', asyncHandler(async (req, res) => {
    const images = await getMovieImages();
    res.status(200).json(images);
}));

// Get movie reviews
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const reviews = await getMovieReviews();
    res.status(200).json(reviews);
}));

// Get movie cast
router.get('/:id/cast', asyncHandler(async (req, res) => {
    const cast = await getMovieCast();
    res.status(200).json(cast);
}));

// Get movie certifications
router.get('/:id/certifications', asyncHandler(async (req, res) => {
    const certifications = await getCertifications();
    res.status(200).json(certifications);
}));

export default router;