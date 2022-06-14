import { displayLog } from './utils';
import { Observable } from 'rxjs';

export default () => {
	/** start coding */

	const hello = new Observable((observer) => {
		observer.next('Hello');
		setTimeout(() => {
			observer.next('world');		
		}, 2000);
	});

	const subscribe = hello.subscribe((event) => displayLog(event));

	/** end coding */
};
