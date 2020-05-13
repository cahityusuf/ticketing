import express from 'express';
import { body } from 'express-validator';
import { signupController } from '../controllers/signupController';
import { existingUser } from '../middlewares/existingUser';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  existingUser,
  signupController
);

export { router as signupRouter };
