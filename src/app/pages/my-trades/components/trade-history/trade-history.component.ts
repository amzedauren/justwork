import { Component, OnInit } from '@angular/core';
import { Trade } from '../../../../models/Trade';
import { ModalController } from '@ionic/angular';
import { TradeHistoryFilterComponent } from './components/trade-history-filter/trade-history-filter.component';
import { Broker } from '../../../../models/Broker';
import { TradeHistoryFilter } from '../../../../models/TradeHistoryFilter';
import { CsdService } from '../../../../services/csd.service';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.scss'],
})
export class TradeHistoryComponent implements OnInit {

  filter: TradeHistoryFilter;

  trades: Trade[] = [
    {
      'Reference': 'reference',
      'Market': 'NASDAQ',
      'TradeDateTime': '2016-01-29T19:27:44',
      'PriceSetting': 450,
      'InstrumentCode': 'KAP',
      'Quantity': 500,
      'Price': 1100.50,
      'Currency': 'USD',
      'SellAccount': 'sell account',
      'BuyAccount': 'buy account',
      'SettleDate': new Date()
    },
    {
      'Reference': 'reference',
      'Market': 'NASDAQ',
      'TradeDateTime': '2016-01-29T19:27:44',
      'PriceSetting': 450,
      'InstrumentCode': 'KAP',
      'Quantity': 500,
      'Price': 1100.50,
      'Currency': 'USD',
      'SellAccount': 'sell account',
      'BuyAccount': 'buy account',
      'SettleDate': new Date()
    },
    {
      'Reference': 'reference',
      'Market': 'NASDAQ',
      'TradeDateTime': '2016-01-29T19:27:44',
      'PriceSetting': 450,
      'InstrumentCode': 'KAP',
      'Quantity': 500,
      'Price': 1100.50,
      'Currency': 'USD',
      'SellAccount': 'sell account',
      'BuyAccount': 'buy account',
      'SettleDate': new Date()
    },
  ];

  brokers: Broker[] = [
    {
      'ID': '1',
      'STATE': 'Active',
      'SHORTCODE': 'shortcode',
      'NAME': 'Halyk Finance',
      'TYPE': 'type',
      'FULLNAME': 'full name',
      'MEMBERCODE': 'membercode',
      'REGNO': 'reg number',
      'ADDRESS1': 'add1',
      'ADDRESS2': 'add2',
      'POSTCODE': 'postcode',
      'COUNTRY': 'country',
      'EMAIL': 'email',
      'PHONE': 777846512,
      'MOBILE': 5548774562,
      'MARKETCHCK': 'marketchk',
      'DEFACCOUNT': 'def account'
    },
    {
      'ID': '2',
      'STATE': 'Active',
      'SHORTCODE': 'shortcode',
      'NAME': 'Freedon Finance',
      'TYPE': 'type',
      'FULLNAME': 'full name',
      'MEMBERCODE': 'membercode',
      'REGNO': 'reg number',
      'ADDRESS1': 'add1',
      'ADDRESS2': 'add2',
      'POSTCODE': 'postcode',
      'COUNTRY': 'country',
      'EMAIL': 'email',
      'PHONE': 777846512,
      'MOBILE': 5548774562,
      'MARKETCHCK': 'marketchk',
      'DEFACCOUNT': 'def account'
    },
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

  tradeTypeFilterOptions = [
    {
      id: 'Buy',
      title: 'Buy'
    },
    {
      id: 'Sell',
      title: 'Sell'
    },
  ];

  constructor(private modalCtrl: ModalController,
              private csdService: CsdService) {
  }

  ngOnInit() {
    this.updatePage();
  }

  private updatePage() {
    this.csdService.getTrades(this.filter);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async showTradeHistoryFilter() {
    const modal = await this.modalCtrl.create({
      component: TradeHistoryFilterComponent,
      backdropDismiss: false,
      cssClass: 'my-trades-trade-history-filter',
      componentProps: {
        brokerOptions: this.brokers,
        currencyOptions: this.currencyOptions,
        securityOptions: this.securityOptions,
        tradeTypeFilterOptions: this.tradeTypeFilterOptions,
        tradeHistoryFilter: this.filter
      }
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    if (!!data) {
      this.filter = data.tradeHistoryFilter;
      this.updatePage();
    }
  }
}
