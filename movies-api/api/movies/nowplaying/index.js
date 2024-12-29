import nowPlayingModel from './nowPlayingModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getNowPlayingMovies, getMovieImages, getMovieReviews, getMovieCast, getCertifications} from '../../tmdb-api';  

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        nowPlayingModel.estimatedDocumentCount(),
        nowPlayingModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await nowPlayingModel.findByNowPlayingDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

// Get movie images
router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

// Get movie reviews
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
}));

// Get movie cast
router.get('/:id/cast', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const cast = await getMovieCast(id);
    res.status(200).json(cast);
}));

// Get movie certifications
router.get('/:id/certifications', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const certifications = await getCertifications(id);
    res.status(200).json(certifications);
}));

export default router;