import { displayLog } from '../utils';
import { fromEvent } from 'rxjs';
import { map, last, takeWhile, takeLast, skip, tap } from 'rxjs/operators';

// last: Se queda con  el ultimo elemento emitido
// takeLast: Emite las últimas x emisiones del Observable fuente
// skip: Retorna un Observable que se salta las primeras x emisiones del Observable fuente


// Para los dos primeros, se necesita que el stream de datos se termine
export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [
      Math.floor(val.offsetX / 50),
      Math.floor(val.offsetY / 50)
    ]),
		// takeWhile(([col, row]) => col > 3),
		tap((val) => console.log(`Cell: [${val}]`)),
    // last(),
		skip(5)
		// takeLast(3)
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
