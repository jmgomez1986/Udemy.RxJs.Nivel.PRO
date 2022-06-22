import { updateDisplay, displayLog } from '../utils';
import { Api } from '../api';
import { concat, fromEvent } from 'rxjs';
import { map, endWith, tap, mergeAll, mergeMap } from 'rxjs/operators';

// High Order Observables: Observables que emiten Observables

// mergeAll: Se usa en OLbservables que USAN Observables, se subscribe a los
//           Observables internos y emite sus eventos como si fueran eventos del
//           HOO
// mergeMap: Idem pero junta la funcion del map

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

		// concat(comment1$, comment2$, comment3$, comment4$)
		// .pipe(
		//   map(({ id, comment }) => `#${id} - ${comment}`),
		//   endWith('--------//--------')
		// )
		// .subscribe((data) => {
		//   displayLog(data);
		// });

		return concat(comment1$, comment2$, comment3$, comment4$).pipe(
			map(JSON.stringify),
			endWith('--------//--------')
		);
	};

	const observable2$ = Api.getComment(1).pipe(map(JSON.stringify));

	/** get comments on button click */
	// fromEvent(button, 'click').subscribe(() => {
	//   const subscription2 = observable2$.subscribe(displayLog);
	// });

	// fromEvent(button, 'click')
	// .pipe(
	//   map((evt) => observable2$),
	//   mergeAll(),
	//   tap(console.log)
	// )
	// .subscribe(displayLog);

	// fromEvent(button, 'click')
	// .pipe(
	//   mergeMap((evt) => observable2$),
	//   tap(console.log)
	// )
	// .subscribe(displayLog);

	fromEvent(button, 'click')
		.pipe(
			mergeMap((evt) => getComments()),
			tap(console.log)
		)
		.subscribe(displayLog);

	/** end coding */
};
