'use strict';
const CHANCE = 0.2

const initBoard = (height, width) => {
	let board = _buildBoard(height, width);
	let count = _countIslands(board);
	return {board, count};
}

const _buildBoard = (height, width) => {
	let board = [];
	for (let i = 0; i < height; i++) {
		board[i] = [];
		for (let j = 0; j < width; j++) {
			// CHANCE set to 20%.
			board[i][j] = (Math.random() < CHANCE) ? 1 : 0;
		}
	}
	return board;
}

const _countIslands = board => {
	let count = 0;
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (board[i][j] > 0) {
				count++;
				_zeroNeig(i, j, board, -count);
			}
		}
	}
	return count;
}

const _zeroNeig = (i, j, board, islandNum) => {
	for (let row = -1; row < 2; row++) {
		for (let col = -1; col < 2; col++) {
			if (
				i + row < 0 ||
				col + j < 0 ||
				i + row >= board.length ||
				col + j >= board[0].length
			) continue;
			const newI = i + row;
			const newJ = j + col;
			if (board[newI][newJ] > 0) {
				board[newI][newJ] = islandNum;
				_zeroNeig(newI, newJ, board, islandNum)
			}
		}
	}
}

const getRandColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * letters.length)];
	}
	return color;
}

export default {
	initBoard,
	getRandColor,
}