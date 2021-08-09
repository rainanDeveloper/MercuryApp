import { app } from './app'
import ws from 'ws'

require('dotenv').config({
	path: '.env'
})

// Setup websocket server
const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', socket => {
	socket.on('message', message => console.log(message))
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