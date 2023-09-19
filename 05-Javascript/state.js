const coffeeStock = {
	arabica: 100,
	robusta: 150,
	liberica: 200
}

class Wolf {
	constructor() {
		this.strength = Math.floor(Math.random() * 100);
	}
	
	howl() {
		return "Auuuuuu!"
	}
}

const isMakingCoffe = true

/*module.exports = {coffeeStock, isMakingCoffe}

console.log(module)*/

export {coffeeStock, isMakingCoffe, Wolf}