import { Component, OnInit } from '@angular/core';
import { Broker } from '../../../../../../models/Broker';
import { ModalController, NavParams } from '@ionic/angular';
import { SimplePickerComponent } from '../../../simple-picker/simple-picker.component';
import { PeriodFilterComponentComponent } from '../period-filter-component/period-filter-component.component';
import { PeriodFilter } from '../../../../../../models/PeriodFilter';
import { TradeHistoryFilter } from '../../../../../../models/TradeHistoryFilter';
import { getByKeyOrDefault, getOptionById, getOrDefault } from '../../../../../../util/UtilMethods';

@Component({
  selector: 'app-trade-history-filter',
  templateUrl: './trade-history-filter.component.html',
  styleUrls: ['./trade-history-filter.component.scss'],
})
export class TradeHistoryFilterComponent implements OnInit {

  filter: TradeHistoryFilter;

  tradeTypeId: string;

  brokerOptions: Broker[];
  pickedBrokerOption: Broker;

  currencyOptions: any[];
  pickedCurrencyOption: any;

  securityOptions: any[];
  pickedSecurityOption: any;

  periodTitle: string;
  periodFilter: PeriodFilter;

  tradeTypeFilterOptions: any[];

  constructor(private navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.setAttributes();
    this.updatePeriodTitle();
  }

  private setAttributes() {
    const { brokerOptions, securityOptions, currencyOptions, tradeTypeFilterOptions, tradeHistoryFilter } = this.navParams.data;
    this.brokerOptions = brokerOptions;
    this.securityOptions = securityOptions;
    this.currencyOptions = currencyOptions;
    this.tradeTypeFilterOptions = tradeTypeFilterOptions;
    this.setFilter(tradeHistoryFilter);
  }

  private setFilter(tradeHistoryFilter) {
    this.filter = getOrDefault(tradeHistoryFilter, {} as TradeHistoryFilter);
    this.pickedBrokerOption = getOptionById(this.brokerOptions, this.filter.brokerId, 'ID');
    this.pickedCurrencyOption = getOptionById(this.currencyOptions, this.filter.currencyId);
    this.pickedSecurityOption = getOptionById(this.securityOptions, this.filter.securityId);
    this.periodFilter = getByKeyOrDefault(this.filter, 'period', {} as PeriodFilter);
    this.tradeTypeId = getByKeyOrDefault(this.filter, 'tradeTypeId', null);
  }

  async showPeriodPicker() {
    const modal = await this.modalCtrl.create({
      component: PeriodFilterComponentComponent,
      cssClass: 'my-trades-trade-history-filter',
      backdropDismiss: false,
      componentProps: {
        periodFilter: this.periodFilter
      }
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (!!data && !!data.apply) {
      this.periodFilter = data.periodFilter;
      this.updatePeriodTitle();
    }
  }

  async showBrokerPicker() {
    await this.showPicker('Broker', this.brokerOptions, 'pickedBrokerOption', 'ID', 'NAME');
  }

  async showCurrencyPicker() {
    await this.showPicker('Currency', this.currencyOptions, 'pickedCurrencyOption');
  }

  async showSecurityPicker() {
    await this.showPicker('Security', this.securityOptions, 'pickedSecurityOption');
  }

  private async showPicker(title: string, options: any[], pickedOptionKey: string, optionIdKey?: string, optionTitleKey?: string) {
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      component: SimplePickerComponent,
      cssClass: 'my-trades-trade-history-filter',
      componentProps: {
        pickOptions: options,
        pickedOption: this[pickedOptionKey],
        optionIdKey: optionIdKey,
        optionTitleKey: optionTitleKey,
        title: title
      }
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (!!data) {
      this[pickedOptionKey] = data.pickedOption;
    }
  }

  updatePeriodTitle() {
    if (!this.periodFilter || (!this.periodFilter.dateTo && !this.periodFilter.dateTo)) {
      return null;
    }
    const fromText = this.getDateFormattedString(this.periodFilter.dateFrom);
    const toText = this.getDateFormattedString(this.periodFilter.dateTo);
    this.periodTitle = fromText + ' - ' + toText;
  }

  getDateFormattedString(date: Date) {
    if (!date) {
      return '#';
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  apply() {
    this.modalCtrl.dismiss({
      tradeHistoryFilter: {
        tradeTypeId: this.tradeTypeId,
        brokerId: getByKeyOrDefault(this.pickedBrokerOption, 'ID', null),
        currencyId: getByKeyOrDefault(this.pickedCurrencyOption, 'id', null),
        securityId: getByKeyOrDefault(this.pickedSecurityOption, 'id', null),
        period: this.periodFilter
      } as TradeHistoryFilter
    });
  }

  onButtonFilterTap(typeId: any) {
    this.tradeTypeId = typeId;
  }
}
