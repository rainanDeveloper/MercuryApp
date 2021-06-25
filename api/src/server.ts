import express from 'express'

const app = express()

const port = process.env.APP_PORT || 80;

app.use(express.json());
app.use('/', express.static('../app/build'));

app.listen(port, () => {
	console.log(`Server listening on the port:${port}`);
})