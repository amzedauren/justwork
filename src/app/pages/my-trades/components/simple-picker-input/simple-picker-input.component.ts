import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-simple-picker-input',
  templateUrl: './simple-picker-input.component.html',
  styleUrls: ['./simple-picker-input.component.scss'],
})
export class SimplePickerInputComponent implements OnInit {

  @Input() title: string;
  @Input() pickedTitle: string;

  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
