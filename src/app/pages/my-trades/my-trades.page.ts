import { Component, OnInit } from '@angular/core';
import { Broker } from '../../models/Broker';
import { Trade } from '../../models/Trade';
import { ModalController } from '@ionic/angular';
import { BrokerFilterComponent } from './components/broker-filter/broker-filter.component';
import { TradeHistoryComponent } from './components/trade-history/trade-history.component';
import { CsdService } from '../../services/csd.service';
import { FloatingProfitComponent } from './components/floating-profit/floating-profit.component';
import { AddBrokerComponent } from './components/add-broker/add-broker.component';

@Component({
  selector: 'app-my-trades',
  templateUrl: './my-trades.page.html',
  styleUrls: ['./my-trades.page.scss'],
})
export class MyTradesPage implements OnInit {

  slideOpts = {
    speed: 400
  };

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

  constructor(private csdService: CsdService,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.csdService.getBrokers().subscribe(brokers => {
      this.brokers = brokers;
    });

    // this.csdService.getTrades().subscribe(trades => {
    //   this.trades = trades;
    // });
  }

  async showAddBroker() {
    const modal = await this.modalController.create({
      component: AddBrokerComponent,
    });
    modal.present();
  }

  async showBrokerFilter() {
    const modal = await this.modalController.create({
      component: BrokerFilterComponent,
      cssClass: 'my-trades-broker-filter',
      componentProps: {
        brokers: this.brokers
      }
    });
    modal.present();
  }

  async showTradeHistory() {
    const modal = await this.modalController.create({
      component: TradeHistoryComponent
    });
    modal.present();
  }

  async openFloatingProfit() {
    const modal = await this.modalController.create({
      component: FloatingProfitComponent,
      componentProps: {
        brokers: this.brokers
      }
    });
    modal.present();
  }
}
