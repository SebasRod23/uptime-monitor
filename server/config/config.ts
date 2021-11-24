import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = parseInt(process.env.PORT!) || 5000;

const DB_URI = process.env.DB_URI || 'localhost:27017';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'mysecret';
const TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'uptime-monitor';
const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';

const COOKIE_MAX_AGE = parseInt(process.env.COOKIE_EXPIRE_TIME!) || 3600000;

const MONITORS_TIME_OFFSET =
  parseInt(process.env.MONITORS_TIME_OFFSET!) || 30000;

const config = {
  server: {
    port: SERVER_PORT,
  },
  db: {
    uri: DB_URI,
  },
  token: {
    secret: TOKEN_SECRET,
    issuer: TOKEN_ISSUER,
    expire_time: TOKEN_EXPIRE_TIME,
  },
  cookie: {
    maxage: COOKIE_MAX_AGE,
  },
  monitorCheck: {
    time: MONITORS_TIME_OFFSET,
  },
};

export default config;
