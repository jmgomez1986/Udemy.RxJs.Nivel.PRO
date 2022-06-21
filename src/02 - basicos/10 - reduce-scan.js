import { displayLog } from '../utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, reduce, scan } from 'rxjs/operators';

// reduce: Aplica una funcion a cada evento que llega por el stream y unicamente devuelve
//         el resultado cuando se cierra el stream (acumulador)
// scan: Similar a 'reduce' pero cada vez que recibe un evento, emite un evento
//       con el valor acumulado, no necesita que se complete el stream

// Ambos pueden utilizar una semilla para inicializar el acumulador

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [
      Math.floor(val.offsetX / 50), 
      Math.floor(val.offsetY / 50)
    ]), // para obtener la celda a partir del click del mouse
		takeWhile(([col, row]) => col != 0), // completa el stream
		tap((val) => console.log(`cell: [${val}]`)), // contar las celdas clickeadas
		// reduce(
		// 	(acc, current) => {
		// 		return {
		// 			clicks: acc.clicks + 1,
		// 			cells: [...acc.cells, current],
		// 		};
		// 	},
		// 	{
		// 		clicks: 0,
		// 		cells: [],
		// 	}
		// )
    scan(
			(acc, current) => {
				return {
					clicks: acc.clicks + 1,
					cells: [...acc.cells, current],
				};
			},
			{
				clicks: 0,
				cells: [],
			}
		)
	);

	const subscription = click$.subscribe((data) =>
		displayLog(`${data.clicks} clicks: ${JSON.stringify(data.cells)}`)
	);

	/** end coding */
};
