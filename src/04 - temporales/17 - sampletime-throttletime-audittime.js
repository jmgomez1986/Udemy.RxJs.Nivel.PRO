import { updateDisplay } from '../utils';
import { fromEvent } from 'rxjs';
import { map, tap, sampleTime, auditTime, throttleTime } from 'rxjs/operators';

// sampleTime: Emite la emisión más reciente del Observable fuente en cada periodo
//             de tiempo determinado siempre y cuando wl flujo de datos haya
//             emitido algun valor en el intervalo
// auditTime:  Espera a detectar un evento y en ese momento crea una ventana
//             temporal que se ha indicado y al acabar emite la muestra mas reciente y
//             se queda de nuevo a la espera
// throttleTime: Cuando detecta un evento lo emite y deja de escuchar el stream
//               durante la ventana temporal indicada, cuando esta se termina, nuevamente
//               espera hasta el nuevo evento

export default () => {
	/** start coding */

	const progressBar = document.getElementById('progress-bar');
	const docElement = document.documentElement;

	//function to update progress bar width on view
	const updateProgressBar = (percentage) => {
		progressBar.style.width = `${percentage}%`;
	};

	//observable that returns scroll (from top) on scroll events
	const scroll$ = fromEvent(document, 'scroll').pipe(
		tap((evt) => console.log('[scroll event]')),
		// sampleTime(50),
		// auditTime(50),
		throttleTime(50),
		map(() => docElement.scrollTop),
		tap((evt) => console.log('[scroll]: ', evt))
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
