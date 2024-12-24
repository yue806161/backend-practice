import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import api from './routers/index';
import web from './routers/backend.web';
import auth from './routers/auth';

const app = express();

const envFile = `.env.${process.env.NODE_ENV || 'dev'}.local`;
dotenv.config({ path: envFile });

const PORT = process.env.PORT || 3000;

// middleware
app.use(morgan('dev', {}));
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));
app.use(express.query({}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use('/auth', auth);
app.use('/api', api);

app.use('/console', web);

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
