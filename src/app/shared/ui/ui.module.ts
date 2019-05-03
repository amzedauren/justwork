import { NgModule } from '@angular/core';
import { ButtonFilterComponent } from './button-filter/button-filter.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    ButtonFilterComponent
  ],
  exports: [
    ButtonFilterComponent
  ]
})
export class UiModule {
}
