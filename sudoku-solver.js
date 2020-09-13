
/*
Sudoku Solver Challenge

Receive a string e.g.
1,809200003400806100001030007640002315000000004507060900020407806104000050030908200
which consists of id, sudoku puzzel

809200003400806100001030007640002315000000004507060900020407806104000050030908200

=

 012 345 678
 ___________
|809 200 003| 0
|400 806 100| 1
|001 030 007| 2
|           | 
|640 002 315| 3
|000 000 004| 4
|507 060 900| 5
|           |
|020 407 806| 6
|104 000 050| 7
|030 908 200| 8
 ‾‾‾‾‾‾‾‾‾‾‾
Key:
0 = blank spaces

solved

879241563453876192261539487648792315392185674517364928925417836184623759736958241

=

 012 345 678
 ___________
|879 241 563| 0
|453 876 192| 1
|261 539 487| 2
|           | 
|648 792 315| 3
|392 185 674| 4
|517 364 928| 5
|           |
|925 417 836| 6
|184 623 759| 7
|736 958 241| 8
 ‾‾‾‾‾‾‾‾‾‾‾


Idea: split the string into an array of 9, maybe an object with position, values and values not used.
First scan the 3x3 boxes and see what values are not used, then scan the rows and columns.

1. fill in the array/objects
2. find out missing from each box
3. check row and column and fill in the position
*/

// const readline = require('readline');
const {
 initBoard,
 fillInSudokuBoard,
 getBlock,
 getValuePosition,
 getRow,
 getColumn,
 removeDuplicatesAndZero,
 save,
 getBoard,
 flattenArray
} = require('./util');

// const rl = readline.createInterface({ input: process.stdin });

const sudokuNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// rl.on('line', line => {
//   const [id, puzzle] = line.split(',');
//   initBoard(puzzle);
//   const solvedPuzzle = solveSudokuBoard();
//   console.log(`${id},${solvedPuzzle}`);
// });


function solveSudoku(puzzle) {
	initBoard(puzzle);
	const solvedboard = solveSudokuBoard();
	console.log(solvedboard);
}

function solveSudokuBoard() {
	let solved = false;
	while(!solved) {
		for (let i = 0; i < 9; i++) {
			const block = getBlock(i);
			block.forEach((value, index) => {
				if (+value === 0) {
					const [row, col] = getValuePosition(block, i, index);
					const rowValues = getRow(row);
					const colValues = getColumn(col);
					const usedNumbers = removeDuplicatesAndZero(block.concat(rowValues.concat(colValues)));
					const possibleValues = sudokuNumbers.filter(value => usedNumbers.indexOf(value.toString()) === -1);
					if (possibleValues.length === 1) {
						save(possibleValues[0], row, col, index);
					}
				}
			});
		}
		if (!getBoard().includes(0)) {
			solved = true;
		}
	}
	return getBoard();
}


solveSudoku('809200003400806100001030007640002315000000004507060900020407806104000050030908200');