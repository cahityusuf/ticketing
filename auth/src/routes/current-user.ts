import express from 'express';
import { currentUserController } from '../controllers/currentUserController';

const router = express.Router();

router.get('/api/users/currentuser', currentUserController);

export { router as currentUserRouter };
