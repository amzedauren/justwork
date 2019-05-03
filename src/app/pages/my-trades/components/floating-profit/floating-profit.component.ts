import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FloatingProfitFilterComponent } from './components/filter/floating-profit-filter.component';
import { FloatingProfitFilter } from '../../../../models/FloatingProfitFilter';

@Component({
  selector: 'app-floating-profit',
  templateUrl: './floating-profit.component.html',
  styleUrls: ['./floating-profit.component.scss'],
})
export class FloatingProfitComponent implements OnInit {

  instruments = [
    {
      shortCode: 'SBUX',
      name: 'Joint Stock (KZT) anau mynau',
      value: 2.9,
      diff: 0
    },
    {
      shortCode: 'KAB.Y',
      name: 'Joint Stock (KZT) anau mynau',
      value: 5150,
      diff: 65
    },
    {
      shortCode: 'KAP',
      name: 'Joint Stock (KZT) anau mynau',
      value: 2.9,
      diff: 0
    },
    {
      shortCode: 'KTCB',
      name: 'Joint Stock (KZT) anau mynau',
      value: 4691,
      diff: -35
    },
  ];

  securityOptions = [
    {
      id: 'KAP',
      title: 'KAP'
    },
    {
      id: 'ZOKA',
      title: 'ZOKA'
    }
  ];

  currencyOptions = [
    {
      id: 'USD',
      title: 'USD'
    },
    {
      id: 'KZT',
      title: 'KZT'
    },
    {
      id: 'CNY',
      title: 'CNY'
    },
  ];

  filter: FloatingProfitFilter;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async showFilter() {
    const modal = await this.modalCtrl.create({
      component: FloatingProfitFilterComponent,
      backdropDismiss: false,
      cssClass: 'my-trades-broker-filter',
      componentProps: {
        currencyOptions: this.currencyOptions,
        securityOptions: this.securityOptions,
        floatingProfitFilter: this.filter
      }
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    if (!!data) {
      this.filter = data.floatingProfitFilter;
    }
  }
}
