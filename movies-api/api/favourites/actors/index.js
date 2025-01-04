import asyncHandler from 'express-async-handler';
import express from 'express';
import FavoriteActor from './favouriteActorsModel';
  
const router = express.Router();

// Get favourite actors
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const favourites = await FavoriteActor.findByUsername(id);
        if (favourites) {
            res.status(200).json(favourites);
        } else {
            res.status(404).json({ error: 'Favourite actors not found' });
        }
    } catch (error) {
        console.error('Error fetching favourite actors:', error.message);
        res.status(500).json({ error: 'Failed to fetch favourite actors' });
    }
}));

export default router;