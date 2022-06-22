import { displayLog } from '../utils';
import { Api } from '../api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, concatMap, catchError, retry } from 'rxjs/operators';

// throwError: Se limita a crear un Observable que tal como se crea, lanza un error
// catchError: Se puede intervenir el error al nivel del Observable, o sea antes
//             de que se emita hacia la subscripcion y la cierre, tiene que devolver
//             si o si un Observable
// retry: permite capturar una excepcion en el flujo de datos y reintentar su
//        ejecucion un numero determinado de veces segun se indique

export default () => {
	/** start coding */

	const button = document.getElementById('btn');

	/** get comments on button click */
	fromEvent(button, 'click')
		.pipe(
			scan((acc, evt) => acc + 1, 0),
			concatMap((id) =>
				Api.getComment(id).pipe(
					// catchError((err, src$) => {
					// 	console.log('Catch!!!');
					// 	return src$;
					// })
          retry(3)
				)
			),
			map(JSON.stringify),
			tap(console.log)
		)
		.subscribe(displayLog, (err) => {
			console.log('Error detected - ', err.message);
		});

	/** end coding */
};
