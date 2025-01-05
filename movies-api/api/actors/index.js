import asyncHandler from 'express-async-handler';
import express from 'express';
import {getActor, getActors} from '../tmdb-api';  
import imagesRouter from './images'
import rolesRouter from './roles'

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    try {
        const actors = await getActors(page);
        res.status(200).json(actors);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({ error: 'Failed to fetch actors' });
    }
}));

// Get actor details
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const actor = await getActor(id);
        if (actor) 
            res.status(200).json(actor);
    } catch (error) {
        console.error('Error fetching movie actors:', error);
        res.status(500).json({ error: 'Failed to fetch movie actors' });
    }
}));

router.use('/images', imagesRouter)
router.use('/roles', rolesRouter)

export default router;
