import asyncHandler from 'express-async-handler';
import express from 'express';
import favouriteMovies from './favouriteMoviesModel';

const router = express.Router();

// Get favourite movies
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const favourites = await favouriteMovies.findByUsername(id);
        if (favourites) {
            res.status(200).json(favourites);
        } else {
            res.status(404).json({ error: 'Favourite movies not found' });
        }
    } catch (error) {
        console.error('Error fetching favourite movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch favourite movies' });
    }
}));

//add to favourites
router.put('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { movie_ids } = req.body;
    const updatedMovies = await favouriteMovies.findOneAndUpdate({username: id}, {movie_ids}, {new: true, upsert: true});
    res.status(200).json(updatedMovies);
}));

export default router;