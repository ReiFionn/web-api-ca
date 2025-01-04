import movieModel from './movieModel';
import imagesRouter from './images';
import castRouter from './cast'
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getMovieImages, getMovieReviews, getMovieCast, getCertifications, getMovies, getMovie} from '../tmdb-api';  

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query; // destructure page and limit and set default values
    [page] = [+page]; //trick to convert to numeric (req.query will contain string values)

    // const [total_results, results] = await Promise.all([
    //     movieModel.estimatedDocumentCount(),
    //     movieModel.find().limit(limit).skip((page - 1) * limit)
    // ]);
    // const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    // const returnObject = {
    //     page,
    //     total_pages,
    //     total_results,
    //     results
    // };
    // res.status(200).json(returnObject);

    try {
        const movies = await getMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
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

// // Get movie reviews
// router.get('/:id/reviews', asyncHandler(async (req, res) => {
//     const id = parseInt(req.params.id);
//     const reviews = await getMovieReviews({ queryKey: [null, { id }] });
//     res.status(200).json(reviews);
// }));

router.use('/cast', castRouter)

// // Get movie certifications
// router.get('/:id/certifications', asyncHandler(async (req, res) => {
//     const id = parseInt(req.params.id);
//     const certifications = await getCertifications({ queryKey: [null, { id }] });
//     res.status(200).json(certifications);
// }));

export default router;
