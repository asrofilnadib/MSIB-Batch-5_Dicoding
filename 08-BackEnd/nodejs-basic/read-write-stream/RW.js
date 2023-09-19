const fs = require('fs')

const readableStream = fs.createReadStream('input.txt', {encoding: "utf-8" ,highWaterMark: 17})
const writeableStream = fs.createWriteStream('output.txt')

readableStream.pipe(writeableStream)

readableStream.on('data', (chunk) => {
	console.log("Reading chunck: ", chunk)
})

readableStream.on('read', () => {
	console.log("Finished reading!")
})

writeableStream.on('write', () => {
	console.log("Finished writing!")
})