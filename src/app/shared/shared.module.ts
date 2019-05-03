import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StockTickerComponent } from './components/stock-ticker/stock-ticker.component';
import { TickerItemComponent } from './components/ticker-item/ticker-item.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DisclosureListComponent } from './components/disclosure-list/disclosure-list.component';
import { DisclosureDetailComponent } from './components/disclosure-detail/disclosure-detail.component';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsDetailComponent,
    StockTickerComponent,
    TickerItemComponent,
    DisclosureListComponent,
    DisclosureDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEchartsModule,
    UiModule
  ],
  entryComponents: [NewsDetailComponent, DisclosureDetailComponent],
  exports: [
    NewsListComponent,
    NewsDetailComponent,
    StockTickerComponent,
    TickerItemComponent,
    DisclosureListComponent,
    DisclosureDetailComponent
  ]
})
export class SharedModule {
}
