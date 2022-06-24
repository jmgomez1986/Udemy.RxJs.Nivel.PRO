import { displayLog } from '../utils';
import { fromEvent } from 'rxjs';
import { mapTo, map, filter } from 'rxjs/operators';

//mapTo: Emite el mismo valor cada vez que el Observable fuente emite un valor
//map: Aplica una función de proyección a cada valor emitido por el Observable fuente,
//     y emite los valores resultantes como un Observable
//filter: Filtra elementos emitidos por el Observable fuente, emitiendo únicamente
//        aquellos que cumplan una condición
export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
    // mapTo('CLICK'),
		map((val) => [
      Math.floor(val.offsetX / 50),
      Math.floor(val.offsetY / 50)
    ]),
		filter((val) => (val[0] + val[1]) % 2 != 0)
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
