import actorModel from './actorModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getActorImages, getActorRoles} from '../tmdb-api';  
import imagesRouter from './images'

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using actorModel
    const [total_results, results] = await Promise.all([
        actorModel.estimatedDocumentCount(),
        actorModel.find().limit(limit).skip((page - 1) * limit)
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

// Get actor details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await actorModel.findByActorDBId(id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({message: 'The actor you requested could not be found.', status_code: 404});
    }
}));

router.use('/images', imagesRouter)

// Get actor roles
router.get('/:id/roles', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const roles = await getActorRoles({ queryKey: [null, { id }] });
    res.status(200).json(roles);
}));

export default router;
