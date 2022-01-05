
import express from 'express';
import { router } from './router';
import * as fs from 'fs';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';


const app = express();

const swaggerFile = path.join(process.cwd(), 'swagger.json');

if (fs.existsSync(swaggerFile)) {
  const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
  const swaggerDocument = JSON.parse(swaggerData);
  app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(express.json());
app.use('/', express.static('../app/build'));
app.use('/login', express.static('../app/build'));
app.use('/signup', express.static('../app/build'));
app.use('/resetPasswd', express.static('../app/build'));
app.use('/chat/:id', express.static('../app/build'));


app.use(router);


export {app};