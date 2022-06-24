import { updateDisplay, displayLog } from '../utils';
import { Api } from '../api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, mergeMap, switchMap, concatMap } from 'rxjs/operators';

// switchMap: Para aplanar HOO, cuando recibe un evento genera un observable
//            interno y se subscribe a el para  pasarle sus eventos al
//            observable externo. A diferencia del mergeMap, cuando recibe un nuevo
//            evento externo, cancela la subscripcion del evento interno anterior
//            antes de subscribirse a un nuevo evento interno, solo llega la ultima
//            Ejemplo para un input de busqueda, llamadas a un servidor
// concatMap: Idem pero de forma ordenada, se subscribe a todas de forma ordenada
//            no las cancela como el anterior

export default () => {
	/** start coding */

	const button = document.getElementById('btn');

	/** get comments on button click */
	fromEvent(button, 'click')
		.pipe(
			scan((acc, evt) => acc + 1, 0),
      // mergeMap(id => Api.getComment(id)),
			// switchMap(id => Api.getComment(id)),
			concatMap((id) => Api.getComment(id)),
			map(JSON.stringify),
			tap(console.log)
		)
		.subscribe(displayLog);

	/** end coding */
};
