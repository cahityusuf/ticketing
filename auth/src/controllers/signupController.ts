import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { User } from '../models/users';

const signupController = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  try {
    const user = User.build({
      password: password,
      email: email,
    });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    // '!a%s?d*f!d_t'
    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

export { signupController };
