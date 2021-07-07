import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connect, disconnect } from '@/src/db';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import http from 'http';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV == 'production' ? '.env' : '.env.dev'),
});

const port = process.env.PORT || 8080;

const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'));

const app = express();
const server = http.createServer(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/hello', (req, res) => {
  return res.json({ text: 'hello' });
});
app.use('/users/login/google', (req, res) => {
  console.log(req.headers);
  return res.json({ message: 'ok' });
});
connect();

server.listen(port, () => {
  console.log(`${port}에서 열림`);
});
