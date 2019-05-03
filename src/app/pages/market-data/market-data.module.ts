import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TradeComponent } from './components/trade/trade.component';
import { TradeSelectComponent } from './components/trade-select/trade-select.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { MarketDataPage } from './market-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxEchartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MarketDataPage
      }
    ]),
  ],
  declarations: [MarketDataPage, TradeComponent, TradeSelectComponent],
  entryComponents: [TradeSelectComponent]
})
export class MarketDataPageModule {
}
