import ws from 'ws'
import { v4 as uuid } from 'uuid'

// Setup websocket server
const wsServer = new ws.Server({ noServer: true })
const chats = []

wsServer.on('connection', socket => {
	const clientUuid = uuid();

	const leaveChat = (chatId)=>{
		if(!chats[chatId][clientUuid]){
			return
		}

		if(Object.keys(chats[chatId]).length === 1) { // Delete the chat if only one member is left
			delete chats[chatId]
		}
		else{ // Removes the member from chat if there is more than a member
			delete chats[chatId][clientUuid]
		}
	}

	socket.on('message', data => {
		const {message, meta, chatId} = JSON.parse(data.toString())

		if(meta === "join") {
			if(!chats[chatId]){// create the chat if not exists
				chats[chatId] = {}
			}
			if(!chats[chatId][clientUuid]){ // joins the chat if not joined
				chats[chatId][clientUuid] = socket
			}
		}
		else if(meta === "leave") {
			leaveChat(chatId)
		}
		else if(! meta) {
			// send the message to all in the room
			Object.entries(chats[chatId]).forEach(([, sock]: Array<typeof socket>) => sock.send({ message }));
		}
	})

	socket.on('close', ()=>{
		Object.keys(chats).forEach(chat => leaveChat(chat))
	})
})


export {
	wsServer
}