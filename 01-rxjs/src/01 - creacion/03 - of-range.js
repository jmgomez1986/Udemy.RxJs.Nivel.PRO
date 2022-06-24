import { displayLog } from '../utils';
import { of, range } from 'rxjs';

// of: Crea secuencia de observables a partir de cualquier cosa
// range: secuencia ordenada de numeros

export default () => {
	/** start coding */

	const source1 = of(1, 2, 3, 4, 5, 6);

	const source2 = of(
		[1, 2, 3],
		'hello world',
		{ foo: 'bar' },
		function sayHello() {
			return 'Hi!';
		}
	);
	const source3 = range(3, 10);
	
	// const subscription = source1.subscribe((data) => displayLog(data));
	// const subscription = source2.subscribe((data) => displayLog(data));
	const subscription = source3.subscribe((data) => displayLog(data));

	/** end coding */
};
