import { updateDisplay, displayLog } from '../utils';
import { Api } from '../api';
import { from, fromEvent } from 'rxjs';
import { map, scan, tap, concatMap, mergeMap } from 'rxjs/operators';

// Transformar evento con un array de valores procedentes de un Observable en una
// secuencia de eventos, con un evento por cada elemento del array

export default () => {
	/** start coding */

	const button = document.getElementById('btn');

	/** get comments on button click */
	fromEvent(button, 'click')
		.pipe(
			scan((acc, evt) => acc + 1, 0),
			concatMap((page) => Api.getCommentsList(page)),
      mergeMap(comments => from(comments)),
			map(JSON.stringify),
			tap(console.log)
		)
		.subscribe(displayLog);

	/** end coding */
};
