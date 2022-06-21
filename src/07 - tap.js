import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

//tap: Lleva a cabo un efecto colateral en cada emisión del Observable fuente,
//     pero retorna un Observable que es idéntico a la fuente
export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
    tap(val => console.log('before: ', val)),
		map((val) => [
      Math.floor(val.offsetX / 50),
      Math.floor(val.offsetY / 50)
    ]),
    tap(val => console.log('after: ', val)),
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};