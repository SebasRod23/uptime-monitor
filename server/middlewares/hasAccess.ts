import { Request, Response, NextFunction } from 'express';

import Monitor from '../models/monitor';

const hasAccess = (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.jwt.id;
  const monitorId = req.params.monitorId;

  Monitor.findById(monitorId).then(
    (monitor) => {
      if (!monitor)
        return res.status(404).json({ message: 'Monitor not found!' });
      if (monitor.userId !== userId)
        return res
          .status(403)
          .json({ message: 'You do not own this Monitor!' });
      res.locals.monitor = monitor;
      next();
    },
    (error) => {
      return res.json(500).json({ message: error.message, error });
    },
  );
};

export default hasAccess;
