
import express from 'express';
import { router } from './router';
import * as swaggerUi from 'swagger-ui-express';
import swagger from './swagger';


const app = express();

app.use(express.json());
app.use('/', express.static('../app/build'));
app.use('/login', express.static('../app/build'));
app.use('/signup', express.static('../app/build'));
app.use('/resetPasswd', express.static('../app/build'));
app.use('/chat/:id', express.static('../app/build'));

swagger.apis = router;

app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swagger));

app.use(router);


export {app};