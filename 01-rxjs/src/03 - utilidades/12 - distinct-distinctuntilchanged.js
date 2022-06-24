import { displayLog } from '../utils';
import { fromEvent } from 'rxjs';
import {
	distinct,
	distinctUntilChanged,
	map,
	takeWhile,
	tap,
} from 'rxjs/operators';

// distinct: no deja pasar ningun valor que coincida con algun valor
//           que ya se haya emitido en el pasado
// distinctUntilChanged: solo evita los valores que se repiten en forma consecutiva

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
		// map(([col, row]) => col + row),
		// tap(val => console.log('Sum of COL + ROW is: ', val)),
		// distinct(),
		// Para objetos, se debe pasar una funcion
		// distinct(([col, row]) => `${col} - ${row}]`),
		// distinctUntilChanged(),
		distinctUntilChanged(
			(cell1, cell2) => cell1[0] === cell2[0] && cell1[1] === cell2[1]
		)
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
