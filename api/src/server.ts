import { app } from './app'

require('dotenv').config({
	path: '.env'
})

const port = process.env.PORT || 8080  // Change to use on heroku app

app.listen(port, () => {
	console.log(`Server listening on the port:${port}`)
})