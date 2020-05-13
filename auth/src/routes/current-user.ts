import express from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { currentUserController } from '../controllers/currentUserController';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  currentUserController
);

export { router as currentUserRouter };
