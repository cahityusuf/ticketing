import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../src/models/users';
import { RequestValidationError } from '../src/errors/request-validation-error';
import { DatabaseConnectionError } from '../src/errors/database-connection-error';
import { BadRequestError } from '../src/errors/bad-request-error';

const authControllers = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { password, email } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  const user = User.build({
    password: password,
    email: email,
  });

  await user.save();

  res.status(201).send(user);
};

export { authControllers };
