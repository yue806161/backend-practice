import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { CONFIG } from './config';
import api from './api/index';
import auth from './api/auth';
import { errorHandler, notFound } from './api/v1/middleware/error';

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));
app.use(express.query({}));
app.use(cookieParser(CONFIG.cookie_secret));
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
app.use('/console', express.static('./web'));
app.use('*', notFound);
app.use(errorHandler);

export default app;
