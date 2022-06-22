import { updateDisplay, displayLog } from '../utils';
import { Api } from '../api';
import { concat, forkJoin, merge, fromEvent, of } from 'rxjs';
import { map, endWith } from 'rxjs/operators';

// concat: Concatena varios Observables de entrada, uno tras otro, emitiendo
//         secuencialmente todos los valores de cada uno de ellos
// forkJoin: Acepta un Array de Observables o un diccionario de Observables,
//           y retorna otro Observable que emite o bien un array de valores
//           en el mismo orden que el array proporcionado, o un diccionario
//           de valores con la misma forma que el diccionario proporcionado.
//           Tener en cuenta que siempre devuelve el ultimo valor de cada
//           flujo de entrada

export default () => {
	/** start coding */

	const button = document.getElementById('btn');

	/** get 4 consecutive comments */
	const getComments = () => {
		//get observables from fake REST API.
		const comment1$ = Api.getComment(1);
		const comment2$ = Api.getComment(2);
		const comment3$ = Api.getComment(3);
		const comment4$ = Api.getComment(4);

		//subscribe to all the observables to get and display comments

		// merge(comment1$, comment2$, comment3$, comment4$)
		// 	.pipe(
		// 		map(({ id, comment }) => `#${id} - ${comment}`),
		// 		endWith('--------//--------')
		// 	)
		// 	.subscribe((data) => {
		// 		displayLog(data);
		// 	});

		// concat(comment1$, comment2$, comment3$, comment4$)
		// .pipe(
		//   map(({ id, comment }) => `#${id} - ${comment}`),
		//   endWith('--------//--------')
		// )
		// .subscribe((data) => {
		//   displayLog(data);
		// });

		forkJoin([comment1$, comment2$, comment3$, comment4$])
			.pipe(
        map(JSON.stringify), 
        endWith('--------//--------')
      )
			.subscribe((data) => {
				displayLog(data);
			});
	};

	/** get comments on button click */
	fromEvent(button, 'click').subscribe(getComments);

	/** end coding */
};
