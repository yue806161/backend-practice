import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app: Express = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));
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
app.use(express.query({}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use('/api/v1/*', require('./routers/api'));

app.use('/*', require('./routers/backendWeb'));

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
