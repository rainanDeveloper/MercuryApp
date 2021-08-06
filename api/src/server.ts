import { app } from './app'
import { Server } from "socket.io"
import http from 'http'

require('dotenv').config({
	path: '.env'
})

const io = new Server(http.createServer(app))

const port = process.env.PORT || 8080  // Change to use on heroku app

app.listen(port, () => {
	console.log(`Server listening on the port:${port}`)
})

io.on('connection', function (socket){
	console.log(`Client connected:`)
	console.log(socket.client)
})