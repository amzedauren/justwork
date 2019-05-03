import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-trade-select',
  templateUrl: './trade-select.component.html',
  styleUrls: ['./trade-select.component.scss'],
})
export class TradeSelectComponent implements OnInit {

  @Input('data') data: any[];

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
