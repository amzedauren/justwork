import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyTradesPage } from './my-trades.page';
import { TotalValueComponent } from './components/total-value/total-value.component';
import { ShareComponent } from './components/share/share.component';
import { TradeComponent } from './components/trade/trade.component';
import { BrokerFilterComponent } from './components/broker-filter/broker-filter.component';
import { SimplePickerComponent } from './components/simple-picker/simple-picker.component';
import { SimplePickerInputComponent } from './components/simple-picker-input/simple-picker-input.component';
import { TradeHistoryComponent } from './components/trade-history/trade-history.component';
import { TradeHistoryFilterComponent } from './components/trade-history/components/trade-history-filter/trade-history-filter.component';
import { UiModule } from '../../shared/ui/ui.module';
import { FloatingProfitComponent } from './components/floating-profit/floating-profit.component';
import { FloatingProfitInfoComponent } from './components/floating-profit/components/info/floating-profit-info.component';
import { PeriodFilterComponentComponent } from './components/trade-history/components/period-filter-component/period-filter-component.component';
import { FloatingProfitInstrumentComponent } from './components/floating-profit/components/instrument/floating-profit-instrument.component';
import { FloatingProfitFilterComponent } from './components/floating-profit/components/filter/floating-profit-filter.component';
import { AddBrokerComponent } from './components/add-broker/add-broker.component';

const routes: Routes = [
  {
    path: '',
    component: MyTradesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    UiModule
  ],
  declarations: [
    MyTradesPage,
    TotalValueComponent,
    ShareComponent,
    TradeComponent,
    AddBrokerComponent,
    BrokerFilterComponent,
    SimplePickerComponent,
    TradeHistoryComponent,
    FloatingProfitComponent,
    FloatingProfitInfoComponent,
    SimplePickerInputComponent,
    TradeHistoryFilterComponent,
    FloatingProfitFilterComponent,
    PeriodFilterComponentComponent,
    FloatingProfitInstrumentComponent,
  ],
  entryComponents: [
    AddBrokerComponent,
    BrokerFilterComponent,
    SimplePickerComponent,
    TradeHistoryComponent,
    FloatingProfitComponent,
    TradeHistoryFilterComponent,
    FloatingProfitFilterComponent,
    PeriodFilterComponentComponent
  ]
})
export class MyTradesPageModule {
}
