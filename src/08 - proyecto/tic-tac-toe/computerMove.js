import { Subject, timer } from 'rxjs';

export const computerMove$ = new Subject();

export const simulateComputerTurn = (validCell) => {
	const randomCell = Math.floor(Math.random() * validCell.length);
	timer(500).subscribe(() => computerMove$.next(validCell[randomCell]));
};
