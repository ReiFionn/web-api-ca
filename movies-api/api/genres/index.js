import express from 'express';
import Genres from './genreModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genres.find();
    res.status(200).json(genres);
}));

export default router;