const nodejs = (message) => {
	console.log(`Hello ${message}`)
}

nodejs("Javascript")

/*const server= new Server({
	host: process.env.NODE_ENV !== "production" ? 'localhost' : 'dicoding.com',
})*/

const memoryInfo = process.memoryUsage()

console.log(memoryInfo)

const firstName = process.argv[2];
const lastName = process.argv[3];

console.log(`Hello ${firstName} ${lastName}`)

console.log("-"*30)

const initialMemoryUsage = process.memoryUsage().heapUsed// TODO 1
const yourName = process.argv[2] // TODO 2
const environment = process.env.NODE_ENV = 'Development' // TODO 3

for(let i = 0; i <= 10000; i++) {
// Proses looping ini akan membuat penggunaan memori naik
}

const currentMemoryUsage = process.memoryUsage().heapUsed // TODO 4
	
	console.log(`Hai, ${yourName}`);
console.log(`Mode environment: ${environment}`)
console.log(`Penggunaan memori dari ${initialMemoryUsage} naik ke ${currentMemoryUsage}`);