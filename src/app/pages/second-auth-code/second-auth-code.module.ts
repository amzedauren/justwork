import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecondAuthCodePage } from './second-auth-code.page';
import { CodeHolderComponent } from './components/code-holder/code-holder.component';
import { CodeNumberComponent } from './components/code-holder/components/code-number/code-number.component';

const routes: Routes = [
  {
    path: '',
    component: SecondAuthCodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SecondAuthCodePage, CodeHolderComponent, CodeNumberComponent]
})
export class SecondAuthCodePageModule {
}
