import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import User from '../models/user';
import signJWT from '../functions/signupJWT';
import config from '../config/config';
import hasJWT from '../middlewares/hasJWT';

const router = Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('username').isString(),
  body('password').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }
    const { email, username, password } = req.body;

    bcrypt.hash(password, 16, (error, hash) => {
      if (error) return res.status(500).json({ message: error.message, error });

      const user = new User({
        email,
        username,
        password: hash,
      });
      user.save().then(
        () => {
          signJWT(user, (error, token) => {
            if (error)
              return res.status(500).json({ message: error.message, error });
            else if (token) {
              res.cookie('token', token, {
                httpOnly: true,
                maxAge: config.cookie.maxage,
              });
              res.cookie('existToken', true, {
                maxAge: config.cookie.maxage,
              });
              return res.status(200).json({
                message: 'User created',
              });
            }
          });
        },
        (error) => {
          res.status(500).json({
            message: error.message,
            error,
          });
        },
      );
    });
  },
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }
    const { email, password } = req.body;

    await User.findOne({ email: email }).then(
      (user) => {
        if (!user)
          return res
            .status(400)
            .json({ message: 'This email does not exist!' });
        bcrypt.compare(password, user.password, (error, hash) => {
          if (!hash)
            return res
              .status(400)
              .json({ message: 'This email and the password do not match!' });
          signJWT(user, (error, token) => {
            if (error)
              return res.status(500).json({ message: error.message, error });
            else if (token) {
              res.cookie('token', token, {
                httpOnly: true,
                maxAge: config.cookie.maxage,
              });
              res.cookie('existToken', true, {
                maxAge: config.cookie.maxage,
              });
              return res.status(200).json({
                message: 'Authentication successful',
              });
            }
          });
        });
      },
      (error) => {
        res.status(500).json({
          message: error.message,
          error,
        });
      },
    );
  },
);

router.post('/logout', hasJWT, async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.clearCookie('existToken');
  return res.status(200).json({ message: 'Logout successful!' });
});

export default router;
