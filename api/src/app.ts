
import express from 'express';
import { router } from './router';

const app = express();

app.use(express.json());
app.use('/', express.static('../app/build'));
app.use('/login', express.static('../app/build'));
app.use('/signup', express.static('../app/build'));
app.use('/resetPasswd', express.static('../app/build'));
app.use('/chat/:id', express.static('../app/build'));

app.use(router);


export {app};