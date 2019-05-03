import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactUsPage } from './contact-us.page';
import {IonicStorageModule} from '@ionic/storage';
import {NewsDetailComponent} from '../../shared/components/news-detail/news-detail.component';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ContactUsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    IonicStorageModule.forRoot(),

  ],
  declarations: [ContactUsPage],
  // entryComponents: [NewsDetailComponent]
})
export class ContactUsPageModule {}
