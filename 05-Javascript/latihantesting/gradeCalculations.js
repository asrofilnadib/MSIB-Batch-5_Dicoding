const averageExams = (valueExams) => {
	const validationNumber = valueExams.every(exam => typeof exam === 'number')
	if (!validationNumber) throw Error("Please input.txt number")
	
	const sumValues = valueExams.reduce((accumulator, curentValue) => accumulator + curentValue, 0)
	return sumValues / valueExams.length
}

const passOfExams = (valueExams, name) => {
	const minValue = 75
	const average = averageExams(valueExams)
	
	if (average > minValue) {
		console.log(`${name} has passed exam`)
		return true
	} else {
		console.log(`${name} failed the exam`)
		return false
	}
}

export {averageExams, passOfExams}