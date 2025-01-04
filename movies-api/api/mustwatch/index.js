import express from 'express';
import MustWatchMovie from './mustWatchModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

router.get('/mustwatch', async (req, res) => {
    const movies = await MustWatchMovie.find();
    res.status(200).json(movies);
});

// Get must watch movies
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const mustwatches = await MustWatchMovie.findByUsername(id);
        if (mustwatches) {
            res.status(200).json(mustwatches);
        } else {
            res.status(404).json({ error: 'Must watch movies not found' });
        }
    } catch (error) {
        console.error('Error fetching must watch movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch must watch movies' });
    }
}));

export default router;