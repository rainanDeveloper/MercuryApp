import { wsServer } from 'wsServer'
import { app } from './app'

require('dotenv').config({
	path: '.env'
})
const port = process.env.PORT || 8080  // Change to use on heroku app

const server = app.listen(port, () => {
	console.log(`Server listening on the port:${port}`)
})

server.on('upgrade', (request, socket, head)=>{
	wsServer.handleUpgrade(request, socket, head, socket => {
		wsServer.emit('connection', socket, request)
	})
})