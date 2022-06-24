import { updateDisplay } from '../utils';
import { fromEvent } from 'rxjs';
import { map, tap, pairwise } from 'rxjs/operators';

// pairwise: Se encarga de emitir los elementos en pareja de datos consecutivos,
//           permite  trabajar sobre el valor actual y el anterior

export default () => {
	/** start coding */
	const progressBar = document.getElementById('progress-bar');
	const docElement = document.documentElement;
	const updateProgressBar = (percentage) => {
		progressBar.style.width = `${percentage}%`;
	};

	//observable that returns scroll (from top) on scroll events
	const scroll$ = fromEvent(document, 'scroll').pipe(
		map(() => docElement.scrollTop),
		tap((evt) => console.log('[scroll]: ', evt)),
		pairwise(),
		tap(([previous, current]) => {
			updateDisplay(current > previous ? 'DESC' : 'ASC');
		}),
		map(([previous, current]) => current) // para no romper la estructura ya 'updateProgressBar' espera un solo valor
	);

	//observable that returns the amount of page scroll progress
	const scrollProgress$ = scroll$.pipe(
		map((evt) => {
			const docHeight = docElement.scrollHeight - docElement.clientHeight;
			return (evt / docHeight) * 100;
		})
	);

	//subscribe to scroll progress to paint a progress bar
	const subscription = scrollProgress$.subscribe(updateProgressBar);

	/** end coding */
};
