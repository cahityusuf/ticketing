import { Request, Response } from 'express';
import { User } from '../models/users';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const signinController = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordMatch = await Password.compare(existingUser.password, password);

  if (!passwordMatch) {
    throw new BadRequestError('Invalid Credentials');
  }

  const userJwt = jwt.sign(
    {
      id: existingUser._id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );
  // '!a%s?d*f!d_t'
  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(existingUser);
};

export { signinController };
