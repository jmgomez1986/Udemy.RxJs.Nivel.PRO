import { timer } from 'rxjs';
import { drawGame, writeMessage } from './tic-tac-toe/draw';
import { game$ } from './tic-tac-toe/game';

export default () => {
	/** start coding */

	game$.subscribe(
		(gameState) => {
			drawGame(gameState);
			if (gameState.winner) {
				timer(500).subscribe(() =>
					writeMessage(gameState.winner === 1 ? 'YOU WIN!!!' : 'YOU LOSE')
				);
			} else if (gameState.finished) {
				timer(500).subscribe(() => writeMessage('DRAWS!!!'));
			}
		},
		(err) => console.log('error: ', err),
		(data) => console.log('COMPLETE')
	);
	/** end coding */
};
