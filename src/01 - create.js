import { displayLog } from './utils';
import { Observable } from 'rxjs';

export default () => {
	/** start coding */

	const hello = new Observable( (observer1) => {
		observer1.next('Hello');
		setTimeout(() => {
			observer1.next('World');
			observer1.complete();
		}, 2000);
	});

	const observer = {
		next: (evt) => displayLog(evt),
		error: (err) => console.error('[ERR] - ', err),
		complete: () => displayLog('[DONE]'),
	};

	const subscribe = hello.subscribe(observer);
	const subscribe2 = hello.subscribe(observer);
	subscribe.unsubscribe();

	/** end coding */
};
