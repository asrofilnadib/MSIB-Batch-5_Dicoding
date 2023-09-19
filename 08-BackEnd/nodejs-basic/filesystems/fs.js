const fs  = require('fs')
const path = require("path");

const checkFile = (error, data) => {
	if (error) {
		console.log("Gagal membuka file text")
		return
	}
	console.log(data)
}

path.resolve(__dirname, '/note.input.txt')

fs.readFile('note.input.txt', 'utf-8', checkFile)

// menggunakan pendekatan synchronous
console.log(fs.readFileSync('note.input.txt', 'utf-8'))