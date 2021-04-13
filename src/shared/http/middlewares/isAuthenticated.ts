import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';
import { NextFunction, Request, Response } from 'express';

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AppError('Token not provided');

    const parts = authHeader.split(' ');

    if (parts.length !== 2) throw new AppError('Token mismatch');

    const [bearer, token] = parts;

    if (!/^Bearer$/i.test(bearer)) throw new AppError('Token malformatted');

    const decodedToken = verify(token, String(auth.jwt.secret));

    const { sub } = decodedToken as ITokenPayload;

    // inserting user's id inside our request object
    req.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new AppError(`Unauthorized: ${err}`);
  }
};

export default isAuthenticated;
