import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

import hasAccess from '../middlewares/hasAccess';
import hasJWT from '../middlewares/hasJWT';
import Monitor, { iMonitor } from '../models/monitor';

const router = Router();

router.get('/', hasJWT, async (req: Request, res: Response) => {
  await Monitor.find({ userId: res.locals.jwt.id }).then(
    (monitors) => {
      return res.status(200).json(monitors);
    },
    (error) => {
      return res.status(500).json({ message: error.message, error });
    },
  );
});

router.post(
  '/add',
  hasJWT,
  body('name').isString(),
  body('url').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }
    const { name, url, message } = req.body;

    const monitor = new Monitor({
      userId: res.locals.jwt.id,
      name: name,
      url: url,
      message: message,
    });

    monitor.save().then(
      () => {
        return res.status(201).json({ message: 'New Monitor added!' });
      },
      (error) => {
        console.log(error);
        return res.status(500).json({ message: error.message, error });
      },
    );
  },
);

router.get(
  '/:monitorId',
  hasJWT,
  hasAccess,
  async (req: Request, res: Response) => {
    const monitor = res.locals.monitor;
    return res.status(200).json(monitor);
  },
);

router.post(
  '/:monitorId/update',
  hasJWT,
  hasAccess,
  body('name').isString(),
  body('url').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }

    const { name, url, message } = req.body;
    const monitor: iMonitor = res.locals.monitor;

    monitor
      .update({
        name: name,
        url: url,
        message: message,
      })
      .then(
        () => {
          return res
            .status(201)
            .json({ message: 'Monitor successfully updated!' });
        },
        (error) => {
          console.log(error);
          return res.status(500).json({ message: error.message, error });
        },
      );
  },
);

router.post(
  '/:monitorId/delete',
  hasJWT,
  hasAccess,
  async (req: Request, res: Response) => {
    const monitor: iMonitor = res.locals.monitor;

    monitor.delete().then(() => {
      return res.status(201).json({ message: 'Monitor successfully deleted!' });
    });
  },
);

export default router;
