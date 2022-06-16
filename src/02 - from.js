import { displayLog } from './utils';
import { from } from 'rxjs';

// from: Crea un Observable a partir de un Array, un objeto similar a un Array,
// una Promesa, un objeto iterable o un objeto similar a un Observable

export default () => {
	/** start coding */

  // const myArray = [1, 2, 3, 4, 5];
  // const myString = 'Hello world!';

  // const observable = from(myArray);
	// const observable1 = from(myString);
	// const subscription = observable.subscribe((val) => displayLog(val));
  // const subscription1 = observable1.subscribe((val) => displayLog(val));

	const myPromise = new Promise((resolve) =>
		setTimeout(() => {
			resolve('Hello World!');
		}, 2000)
	);

	const observable = from(myPromise);
	const subscription = observable.subscribe((val) => displayLog(val));
	/** end coding */
};
