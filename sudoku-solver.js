
/*
Sudoku Solver Challenge

Receive a string e.g.
1,809200003400806100001030007640002315000000004507060900020407806104000050030908200
which consists of id, sudoku puzzel

809200003400806100001030007640002315000000004507060900020407806104000050030908200

=

809 200 003 
400 806 100 
001 030 007 

640 002 315 
000 000 004 
507 060 900 

020 407 806 
104 000 050 
030 908 200

0 = blank spaces


Idea: split the string into an array of 9, maybe an object with position, values and values not used.
First scan the 3x3 boxes and see what values are not used, then scan the rows and columns.
*/

// const readline = require('readline');

// const rl = readline.createInterface({ input: process.stdin });

// rl.on('line', line => {
//   const [id, puzzle] = line.split(',');
//   const solvedPuzzle = solveSudoku(puzzle);
//   console.log(`${id},${puzzle}`);
// });

/*
1. fill in the array/objects
2. find out missing from each box
3. check row and column and fill in the position
*/
function solveSudoku(puzzle) {
	const sudokuArray = fillInSudokuArray(puzzle);
	return sudokuArray;
}

function fillInSudokuArray(puzzle) {
	const sudokuArray = [];
	for (let i = 0; i < 9; i=i+3) {
		for(let j = 0; j < 3; j++){
			for(let k = 0; k < 3; k++){
				if (!sudokuArray[k+i]) {
					sudokuArray[k+i] = [];
				}
				sudokuArray[k+i].push(puzzle.substring(0,3));
				puzzle = puzzle.substring((3), puzzle.length);
			}
		}
	}
	return sudokuArray;
}

console.log(solveSudoku('809200003400806100001030007640002315000000004507060900020407806104000050030908200'));