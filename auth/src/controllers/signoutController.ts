import { Request, Response } from 'express';
import { User } from '../models/users';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const signoutController = async (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};

export { signoutController };
