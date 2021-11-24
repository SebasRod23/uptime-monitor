import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import config from './config/config';
import authRouter from './routers/auth';
import monitorRouter from './routers/monitor';
import checkMonitors from './functions/checkMonitors';

const app = express();

mongoose.connect(config.db.uri);

const db = mongoose.connection;
db.on('error', () => {
  console.log('Error while connecting to database');
});
db.once('open', () => {
  console.log('Connection successful');
});

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/monitor', monitorRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is running');
});

app.listen(config.server.port, () => {
  console.log('Server is listening on port: ' + config.server.port);
});

setInterval(checkMonitors, config.monitorCheck.time);
