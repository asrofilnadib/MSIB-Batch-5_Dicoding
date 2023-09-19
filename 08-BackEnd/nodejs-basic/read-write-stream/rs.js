const fs = require("fs")

const readableStream = fs.createReadStream('fs.txt', { highWaterMark: 10 })

readableStream.on('stream', () => {
	try {
		process.stdout.write(`[${readableStream.read()}]`)
	} catch (error) {
		console.log('Gagal membaca file teks')
	}
})

readableStream.on('end', () => {
	console.log('done')
})