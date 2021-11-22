import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';

const hasJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, config.token.secret);
    res.locals.jwt = decoded;
    next();
  } catch (error) {
    res.clearCookie('token');
    res.clearCookie('existToken');
    return res.status(401).send({
      message: 'Unauthorized!',
    });
  }
};

export default hasJWT;
