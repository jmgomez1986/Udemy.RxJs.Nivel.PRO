import { displayLog } from './utils';
import { interval, timer } from 'rxjs';

// interval: Sirve para emitir una secuencia de valores cada cierto tiempo,
// la secuencia no termina nunca, hay que terminarla manualmente o desubscribirse
// timer: aparte de lo que hace 'interval', se puede crear tambien intervalos
// a partir del primer evento
export default () => {
	/** start coding */

	const source = interval(500);

	const subscription = source.subscribe((data) => displayLog(data));

	timer(3000).subscribe(() => subscription.unsubscribe());
	// setTimeout(() => subscription.unsubscribe(), 3000 );

	const source2 = timer(4000, 100);
	const subscription2 = source2.subscribe((data) => displayLog(`2 - ${data}`));
	timer(6000).subscribe(() => subscription2.unsubscribe());

	/** end coding */
};
