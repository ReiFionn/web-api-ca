import asyncHandler from 'express-async-handler';
import express from 'express';
import { getActorRoles } from '../../tmdb-api';
  
const router = express.Router();

// Get movie images
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const roles = await getActorRoles(id);
        if (roles) {
            res.status(200).json(roles);
        } else {
            res.status(404).json({ error: 'Roles not found' });
        }
    } catch (error) {
        console.error('Error fetching actor roles:', error.message);
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
}));

export default router;