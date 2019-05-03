import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss'],
})
export class ButtonFilterComponent implements OnInit {

  @Input() values: any[];
  @Input() selectedValue: any;

  @Input() nullValue: boolean;
  @Input() nullValueTitle = 'All';
  @Input() valueTitleKey = 'title';


  @Output() select = new EventEmitter();

  basicColor = '#000';
  selectedColor = '#ff0000';

  constructor() {
  }

  ngOnInit() {
  }

  selectValue(value: any) {
    this.selectedValue = value;
    this.select.emit(value);
  }
}
