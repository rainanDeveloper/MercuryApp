import { app } from './app'

require('dotenv').config({
	path: '.env'
})

const port = process.env.APP_PORT || 80

app.listen(port, () => {
	console.log(`Server listening on the port:${port}`)
})