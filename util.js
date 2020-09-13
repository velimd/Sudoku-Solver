const rowsSection = [[0,1,2], [3,4,5], [6,7,8]];
const board = [];

function initBoard(puzzle) {
	const board = [];
	for (let row = 0; row < 9; row++) {
		board[row] = [];
		for (let sectionCol = 0; sectionCol < 3; sectionCol++) {
			board[row].push(puzzle.substring(0,3).split(''));
			puzzle = puzzle.substring(3, puzzle.length);
		}
	}
	this.board = board;
}

function getBoard() {
	return this.board.toString().replace(/,/g, '');
}

function save(value, row, col, colSection) {
	this.board[row][Math.floor(col / 3)][colSection % 3] = value.toString();
}

function getRowsRangeSection(row) {
	for (let i = 0; i < 3; i++) {
		if (rowsSection[i].includes(row)) {
			return [rowsSection[i][0], rowsSection[i][2]];
		}
	}
	return null;
}

function getRow(row) {
	return flattenArray(this.board[row]);
}

function getColumn(col) {
	const column = [];
	for (let row = 0; row < 9; row++) {
		column.push(flattenArray(this.board[row])[col]);
	}
	return column;
}

function getBlock(blockIndex) {
	const blockValues = [];
	const colSection = blockIndex % 3;
	let [first, last] = getRowsRangeSection(blockIndex);
	for (; first <= last; first++) {
		blockValues.push(this.board[first][colSection]);
	}
	return flattenArray(blockValues);
}

function getBlockFromRowCol(row, col) {
	const blockValues = [];
	const colSection = Math.floor(col / 3);
	let [first, last] = getRowsRangeSection(row);
	for (; first <= last; first++) {
		blockValues.push(this.board[first][colSection]);
	}
	return flattenArray(blockValues);
}

function getValuePosition(block, blockIndex, arrayPos) {
	const rowInBlock = Math.floor(arrayPos / 3);
	const colInBlock = arrayPos % 3;
	const rowInBoard = rowInBlock + (Math.floor(blockIndex / 3) * 3);
	const colInBoard = colInBlock + ((blockIndex % 3) * 3)
	return [rowInBoard, colInBoard];
}

function flattenArray(array) {
	return [].concat.apply([], array);
}

function removeDuplicatesAndZero(array) {
	return [... new Set(array)].filter(i => +i !== 0);
}

module.exports = {
	initBoard,
	getBoard,
	save,
	getRowsRangeSection,
	getRow,
	getColumn,
	getBlockFromRowCol,
	getBlock,
	getValuePosition,
	flattenArray,
	removeDuplicatesAndZero
};