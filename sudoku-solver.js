
/*
Sudoku Solver Challenge

Receive a string e.g.
1,809200003400806100001030007640002315000000004507060900020407806104000050030908200
which consists of id, sudoku puzzel

809200003400806100001030007640002315000000004507060900020407806104000050030908200

=
012 345 678

809 200 003   0
400 806 100   1
001 030 007   2

640 002 315   3
000 000 004   4
507 060 900   5

020 407 806   6
104 000 050   7
030 908 200   8

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

const rowsSection = [[0,1,2], [3,4,5], [6,7,8]];

function solveSudoku(puzzle) {
	const board = fillInSudokuBoard(puzzle);
	const solvedboard = solveSudokuBoard(board);
	console.log(solvedboard);
	return solvedboard;
}

// function fillInSudokuBoard(puzzle) {
// 	const blocks = [];
// 	for (let i = 0; i < 9; i=i+3) {
// 		for(let j = 0; j < 3; j++){
// 			for(let k = 0; k < 3; k++){
// 				if (!blocks[k+i]) {
// 					blocks[k+i] = [];
// 				}
// 				blocks[k+i] = blocks[k+i].concat(puzzle.substring(0,3).split(''));
// 				puzzle = puzzle.substring((3), puzzle.length);
// 			}
// 		}
// 	}
// 	return blocks;
// }

function fillInSudokuBoard(puzzle) {
	const board = [];
	for (let row = 0; row < 9; row++) {
		board[row] = [];
		for (let sectionCol = 0; sectionCol < 3; sectionCol++) {
			board[row].push(puzzle.substring(0,3).split(''));
			puzzle = puzzle.substring(3, puzzle.length);
		}
	}
	return board;
}

function solveSudokuBoard(board) {
	return getBlock(board, 4, 5);
	// return board;
}

function getRow(board, row) {
	return flattenArray(board[row]);
}

function getRowsRangeSection(row) {
	for (let i = 0; i < 3; i++) {
		if (rowsSection[i].includes(row)) {
			return [rowsSection[i][0], rowsSection[i][2]];
		}
	}
	return null;
}

function getColumn(board, col) {
	const column = [];
	for (let row = 0; row < 9; row++) {
		column.push(flattenArray(board[row])[col]);
	}
	return column;
}

function getBlock(board, row, col) {
	const block = [];
	const colSection = Math.floor(col / 3);
	let [first, last] = getRowsRangeSection(row);
	for (; first <= last; first++) {
		block.push(board[first][colSection]);
	}
	return flattenArray(block);
}

function flattenArray(array) {
	return [].concat.apply([], array);
}

solveSudoku('809200003400806100001030007640002315000000004507060900020407806104000050030908200');