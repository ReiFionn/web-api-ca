import asyncHandler from 'express-async-handler';
import express from 'express';
import favouriteMoviesModel from './favouriteMoviesModel';
  
const router = express.Router();

// Get favourite movies
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const favourites = await favouriteMoviesModel.findByUsername();
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

export default router;