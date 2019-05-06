import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import {FooterModule} from '../../shared/ui/footer/footer.module';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [
      FingerprintAIO
  ]
})
export class LoginPageModule {}
