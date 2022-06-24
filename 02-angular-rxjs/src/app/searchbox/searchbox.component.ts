import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {
  @ViewChild('searchBox', { static: true }) public searchBox: NgModel;
  @Output() value: EventEmitter<string> = new EventEmitter();
  public text = '';

  constructor() {}

  ngOnInit() {
    this.searchBox.valueChanges.subscribe((evt) => this.value.emit(evt));
  }
}
