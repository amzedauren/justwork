import { Component, Input, OnInit } from '@angular/core';
import { Instrument } from '../../../../../../models/Instrument';

@Component({
  selector: 'app-floating-profit-instrument',
  templateUrl: './floating-profit-instrument.component.html',
  styleUrls: ['./floating-profit-instrument.component.scss'],
})
export class FloatingProfitInstrumentComponent implements OnInit {

  @Input() instrument: Instrument;

  constructor() {
  }

  ngOnInit() {
  }

}
