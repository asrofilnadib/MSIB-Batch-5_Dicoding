import {averageExams} from "../gradeCalculations";

test('it should return exact average', () => {
	const nilaiSiswa = [80, 100, 100, 85, 75, 90]
	expect(averageExams(nilaiSiswa)).toEqual(90)
})

test('it should handle non-number ', () => {
	const listValueOfExams = [80, 'a', '100', 80];
	expect(() => averageExams(listValueOfExams)).toThrow();
})