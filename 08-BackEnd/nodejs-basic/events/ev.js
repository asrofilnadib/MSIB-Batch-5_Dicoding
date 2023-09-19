/*
const { EventEmitter } = require('events')

const myEventEmitter = new EventEmitter()

const makeCoffe = (name) => {
	console.log(`Kopi ${name} telah dibuat!`)
}

const payBills = (price) => {
	console.log(`Bills ${price} telah dibuat!`)
}

const onCoffeOrderList = ({name, price}) => {
	makeCoffe(name)
	payBills(price)
}

myEventEmitter.on('coffe-order', onCoffeOrderList)
myEventEmitter.emit('coffe-order', {name: "Tubruk", price: 15000})
*/


// TODO 1
const { EventEmitter } = require('events')

const birthdayEventListener = ({name}) => {
	console.log(`Happy birthday ${name}!`);
}

// TODO 2
const myEmitter = new EventEmitter()

// TODO 3
myEmitter.on('birthday', birthdayEventListener)

// TODO 4
myEmitter.emit('birthday', {name: "Asrofil Nadib"})