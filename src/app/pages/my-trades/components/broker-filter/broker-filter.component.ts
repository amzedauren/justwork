import { Component, OnInit } from '@angular/core';
import { Broker } from '../../../../models/Broker';
import { ModalController, NavParams } from '@ionic/angular';
import { SimplePickerComponent } from '../simple-picker/simple-picker.component';

@Component({
  selector: 'app-broker-filter',
  templateUrl: './broker-filter.component.html',
  styleUrls: ['./broker-filter.component.scss'],
})
export class BrokerFilterComponent implements OnInit {

  brokers: Broker[];

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
  pickedCurrencyOption: any = this.currencyOptions[1];

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
  pickedSecurityOption: any = this.securityOptions[0];

  constructor(private navParams: NavParams,
              public modalController: ModalController) {
  }

  ngOnInit() {
    this.brokers = this.navParams.data.brokers;
  }

  async showCurrencyPicker() {
    await this.showPicker('Currency', this.currencyOptions, 'pickedCurrencyOption');
  }

  async showSecurityPicker() {
    await this.showPicker('Security', this.securityOptions, 'pickedSecurityOption');
  }

  private async showPicker(title: string, options: any[], pickedOptionKey: string) {
    const modal = await this.modalController.create({
      component: SimplePickerComponent,
      cssClass: 'my-trades-broker-filter',
      componentProps: {
        pickOptions: options,
        pickedOption: this[pickedOptionKey],
        title: title
      }
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (!!data) {
      this[pickedOptionKey] = data.pickedOption;
    }
  }

  onButtonFilterTap(value: any) {
    console.log(value);
  }
}
