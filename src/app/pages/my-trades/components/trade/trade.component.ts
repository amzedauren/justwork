import { Component, Input, OnInit } from '@angular/core';
import { Trade } from '../../../../models/Trade';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
})
export class TradeComponent implements OnInit {

  @Input() trade: Trade;

  constructor() {
  }

  ngOnInit() {
  }

}
