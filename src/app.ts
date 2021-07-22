import 'module-alias/register';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import http from 'http';
import apiRouter from '@/src/routes';
import cookieSession from 'cookie-session';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV == 'production' ? '.env' : '.env.dev'),
});

const port = process.env.PORT || 8080;

const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'));

const app = express();
const server = http.createServer(app);

app.set('port', port);
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/hello', (req, res) => {
  return res.json({ text: 'hello' });
});

app.use('/', apiRouter);

app.use((req, res, next) => {
  next(createError(404));
});

server.listen(port, () => {
  console.log(`${port}에서 열림`);
});
