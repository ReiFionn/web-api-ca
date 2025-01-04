import asyncHandler from 'express-async-handler';
import express from 'express';
import { getMovieCast } from '../../tmdb-api';
  
const router = express.Router();

// Get movie cast
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const cast = await getMovieCast(id);
        if (cast) {
            res.status(200).json(cast);
        } else {
            res.status(404).json({ error: 'Cast not found' });
        }
    } catch (error) {
        console.error('Error fetching movie cast:', error.message);
        res.status(500).json({ error: 'Failed to fetch cast' });
    }
}));

export default router;