import { Component, OnInit, } from '@angular/core';
import { MarketWatchService } from '../../services/market-watch.service';
import { ModalController } from '@ionic/angular';
import { Stocks } from '../../models/stocks';
import { TradeSelectComponent } from './components/trade-select/trade-select.component';
import { LocalizationService } from '../../localization.service';

@Component({
  selector: 'app-market-data',
  templateUrl: 'market-data.page.html',
  styleUrls: ['market-data.page.scss'],
})
export class MarketDataPage implements OnInit {

  stocks: Stocks[];

  constructor(private modalController: ModalController,
              private localizationService: LocalizationService,
              private marketWatchService: MarketWatchService) {
  }

  ngOnInit(): void {
    this.update();
  }

  update() {
    this.updateData();
  }

  updateData() {
    this.marketWatchService.getStocks().subscribe((data) => {
      this.stocks = data;
      this.stocks[0]['selected'] = true;
      this.stocks[1]['selected'] = true;
      this.stocks[2]['selected'] = true;
      this.stocks[3]['selected'] = true;
    });
  }

  async selectTrades() {
    const modal = await this.modalController.create({
      component: TradeSelectComponent,
      componentProps: { data: this.stocks }
    });
    modal.present();
  }

}
