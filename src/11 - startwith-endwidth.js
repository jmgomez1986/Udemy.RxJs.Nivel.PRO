import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, startWith, endWith } from 'rxjs/operators';

// startWith: modifica el observable para emitir ciertos valores de forma previa a
//            cualquier evento del observable original
// endWith: idem pero cuando se completa el stream

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [
      Math.floor(val.offsetX / 50),
      Math.floor(val.offsetY / 50)
    ]),
		takeWhile(([col, row]) => col != 0),
		tap((val) => console.log(`cell: [${val}]`)),
    startWith('grid dimension', '10x10'),
    endWith('Game finished', 'Bye!!!'),
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
