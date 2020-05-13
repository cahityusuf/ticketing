import express, { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/users';

const existingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new BadRequestError('Email in use');
  }

  next();
};

export { existingUser };
