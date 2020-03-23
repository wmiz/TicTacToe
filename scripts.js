const GameBoard = (() => {
	let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

	const boardElement = document.querySelector("#board");
	const entryElements = boardElement.querySelectorAll("button");

	function display() {
		entryElements.forEach((element, i) => {
			element.innerHTML = board[i++]; 
		});
	}

	function placeToken(player, space) {
		if(board[space] === '_') {
			board[space] = player.token;
			return true;
		}
	}

	function isWinState() {
		// Check rows
		if (board[0] === board[1] && board[1] === board[2] && board[0] !== "_") {
			return true;
		}
		if (board[3] === board[4] && board[4] === board[5] && board[3] !== "_") {
			return true;
		}
		if (board[6] === board[7] && board[7] === board[8] && board[6] !== "_") {
			return true;
		}
		// Check columns
		if (board[0] === board[3] && board[3] === board[6] && board[0] !== "_") {
			return true;
		}
		if (board[1] === board[4] && board[4] === board[7] && board[1] !== "_") {
			return true;
		}
		if (board[2] === board[5] && board[5] === board[8] && board[2] !== "_") {
			return true;
		}
		// Check diagonals
		if (board[0] === board[4] && board[4] === board[8] && board[0] !== "_") {
			return true;
		}
		if (board[2] === board[4] && board[4] === board[6] && board[2] !== "_") {
			return true;
		}
		return false;
	}

	function reset() {
		board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
	}

	return {
		display: display,
		isWinState: isWinState,
		placeToken: placeToken,
		reset: reset,
		entryElements
	}
})();

const Player = (token) => {
	const name = `${token}-player`;
	const wins = 0;
	return {token, name, wins}
};

const Game = (() => {
	const player1 = Player('X');
	const player2 = Player('O');
	let player1Turn = true;
	const won = () => (x.wins >= 3 || o.wins >= 3);

	GameBoard.entryElements.forEach(element => {
		element.addEventListener("click", () => {
			// Each turn
			let move = GameBoard.placeToken(getCurrPlayer(), element.id);
			
			if (GameBoard.isWinState()) {
				playerHasWon(getCurrPlayer());
			} else if (move) {
				player1Turn = player1Turn ? false : true;
			}
			GameBoard.display();

		});
	});

	GameBoard.display();

	function getCurrPlayer() {
		return player1Turn ? player1 : player2;
	}

	function playerHasWon(player) {
		console.log(player.name + " has won!")
		player.wins++;
		GameBoard.reset();
		if ((player1.wins + player2.wins) % 2 === 0) {
			player1Turn = true;
		} else {
			player1Turn = false;
		}
	}

	return {
		getCurrPlayer: getCurrPlayer
	}
})();