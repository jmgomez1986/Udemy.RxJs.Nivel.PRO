import { displayLog } from '../utils';
import { fromEvent } from 'rxjs';
import { map, first, take, takeWhile, tap } from 'rxjs/operators';

// first: Emite la primerra emision del Observable
// take: Emite las primeras x emisiones del Observable fuente
// takeWhile: Emite las emisiones del Observable fuente siempre y hasta cuando cumplan 
//            la condición especificada. Se completa en cuanto haya un valor que no
//            cumpla la condición

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [
      Math.floor(val.offsetX / 50),
      Math.floor(val.offsetY / 50)
    ]),
		// first(val => val[0] > 3),
		// take(4)
		takeWhile(([col, row]) => col > 3)
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
