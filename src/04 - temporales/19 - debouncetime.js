import { updateDisplay, displayLog } from '../utils';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

// debounceTime: Emite un valor del Observable fuente si, y solo si, pasa un periodo
//               de tiempo determinado sin que este emita ningún valor

export default () => {
	/** start coding */

	const inputBox = document.getElementById('input-box');

	const inputSrc$ = fromEvent(inputBox, 'input').pipe(
		debounceTime(300),
		map((event) => event.target.value)
	);

	inputSrc$.subscribe(displayLog);

	/** end coding */
};
