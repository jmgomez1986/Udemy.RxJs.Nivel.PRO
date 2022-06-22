import { updateDisplay, displayLog } from '../utils';

import { fromEvent, combineLatest } from 'rxjs';
import { map, debounceTime, withLatestFrom, tap } from 'rxjs/operators';

// combineLatest: Junta varios stream de entrada y cada vez que recibe un evento
//                emite un array con el ultimo valor de cada entreada
// withLatestFrom: Solo emite datos cuando su stream de origen los emite

export default () => {
	/** start coding */

	/** get the form element */
	const form = document.getElementById('form');

	/** get observables from each form element */
	const formName$ = fromEvent(form.name, 'input').pipe(
		debounceTime(400),
		map((evt) => evt.target.value)
	);
	const formEmail$ = fromEvent(form.email, 'input').pipe(
		debounceTime(400),
		map((evt) => evt.target.value)
	);
	const formNumber$ = fromEvent(form.phone, 'input').pipe(
		debounceTime(400),
		map((evt) => evt.target.value)
	);
	const submitButton$ = fromEvent(form.btn, 'click');

	// const formData$ = combineLatest([formName$, formEmail$, formNumber$]);

	const formData$ = submitButton$.pipe(
		withLatestFrom(formName$, formEmail$, formNumber$),
    tap((data) => console.log('Before map: ', data)),
		map((data) => {
			const [click, ...formData] = data; // La primera posicion del array 'data' va a parar a la variable click, y el resto a la variable 'formData'
			return formData;
		}),
    tap((data) => console.log('After map: ', data)),
	);

	formData$.subscribe(displayLog);

	/** end coding */
};
