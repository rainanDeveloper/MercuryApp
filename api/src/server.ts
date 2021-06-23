import express from 'express'
import path from 'path'

const app = express()

const port = process.env.APP_PORT || 80;

app.use(express.json());
app.use('/', express.static('../app/build'));

// Serve api routes under /api
// Example
app.get('/api/hello', (request, response)=>{
	response.json({
		message: 'Hello World from api demo!'
	})
})

app.listen(port, () => {
	console.log(`Server listening on the port:${port}`);
})