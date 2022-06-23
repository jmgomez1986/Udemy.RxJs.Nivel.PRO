import { BehaviorSubject } from "rxjs";

//initial game state
const initialGame = {
	board: Array(3).fill().map(() => Array(3).fill(0)),
	nextPlayer: 1,
	finished: false,
	winner: null
};

export const gameState$ = new BehaviorSubject(initialGame);