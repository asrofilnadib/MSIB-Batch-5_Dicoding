const hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
	const server = hapi.server({
		port: 5000,
		host: 'localhost',
	})
	
	server.route(routes)
	
	await server.start()
	console.log(`Server berjalan pada port ${server.info.uri}`)
}

init()