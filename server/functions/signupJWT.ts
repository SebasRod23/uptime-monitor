import jwt from 'jsonwebtoken';

import config from '../config/config';
import { iUser } from '../models/user';

const signJWT = (
  user: iUser,
  callback: (error: Error | null, token: string | null) => void,
) => {
  try {
    jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      config.token.secret,
      {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: config.token.expire_time,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      },
    );
  } catch (error: any) {
    console.log(error);
    callback(error, null);
  }
};

export default signJWT;
