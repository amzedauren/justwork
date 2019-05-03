import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TradeDetailPage } from './trade-detail.page';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { UiModule } from '../../shared/ui/ui.module';

const routes: Routes = [
  {
    path: '',
    component: TradeDetailPage
  }
];

@NgModule({
  imports: [
    UiModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxEchartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TradeDetailPage]
})
export class TradeDetailPageModule {
}
