let GameBoard = (() => {

	let board = ['X', ' ', 'O', 'X', ' ', 'O', 'X', '', 'O'];
	function displayBoard() {
		let boardElement = document.querySelector("#board");
		let entryElements = boardElement.querySelectorAll("p");
		console.log(entryElements);
		let i = 0;
		entryElements.forEach(element => {
			element.innerHTML = board[i++]; 
		})
	}

	return {
		displayBoard: displayBoard
	}
})();

GameBoard.displayBoard();