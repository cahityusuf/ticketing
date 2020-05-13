import express from 'express';
import { body } from 'express-validator';
import { signinController } from '../controllers/signinController';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must bu valid'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage('You must suppy a password'),
  ],
  validateRequest,
  signinController
);

export { router as signinRouter };
