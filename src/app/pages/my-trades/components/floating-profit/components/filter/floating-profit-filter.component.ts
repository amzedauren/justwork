import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SimplePickerComponent } from '../../../simple-picker/simple-picker.component';
import { getByKeyOrDefault, getOptionById, getOrDefault } from '../../../../../../util/UtilMethods';
import { FloatingProfitFilter } from '../../../../../../models/FloatingProfitFilter';

@Component({
  selector: 'app-floating-profit-filter',
  templateUrl: './floating-profit-filter.component.html',
  styleUrls: ['./floating-profit-filter.component.scss'],
})
export class FloatingProfitFilterComponent implements OnInit {

  filter: FloatingProfitFilter;

  currencyOptions: any[];
  pickedCurrencyOption: any;

  securityOptions: any[];
  pickedSecurityOption: any;

  constructor(private navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.setAttributes();
  }

  private setAttributes() {
    const { currencyOptions, securityOptions, floatingProfitFilter } = this.navParams.data;
    this.currencyOptions = currencyOptions;
    this.securityOptions = securityOptions;
    this.setFilter(floatingProfitFilter);
  }

  private setFilter(floatingProfitFilter) {
    this.filter = getOrDefault(floatingProfitFilter, {} as FloatingProfitFilter);
    this.pickedCurrencyOption = getOptionById(this.currencyOptions, this.filter.currencyId);
    this.pickedSecurityOption = getOptionById(this.securityOptions, this.filter.securityId);
  }

  async showCurrencyPicker() {
    await this.showPicker('Currency', this.currencyOptions, 'pickedCurrencyOption');
  }

  async showSecurityPicker() {
    await this.showPicker('Security', this.securityOptions, 'pickedSecurityOption');
  }

  private async showPicker(title: string, options: any[], pickedOptionKey: string) {
    const modal = await this.modalCtrl.create({
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

  apply() {
    this.modalCtrl.dismiss({
      floatingProfitFilter: {
        currencyId: getByKeyOrDefault(this.pickedCurrencyOption, 'id', null),
        securityId: getByKeyOrDefault(this.pickedSecurityOption, 'id', null),
      } as FloatingProfitFilter
    });
  }
}
