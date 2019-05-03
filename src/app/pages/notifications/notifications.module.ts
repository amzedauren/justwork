import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {IonicModule} from '@ionic/angular';

import { NotificationsPage } from './notifications.page';
import {PushListComponent} from './components/push-list/push-list.component';
import {NoticeListComponent} from './components/notice-list/notice-list.component';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage,
    children: [
      {
        path: '',
        redirectTo: 'push'
      },
      {
        path: 'push',
        component: PushListComponent,

      },
      {
        path: 'notices',
        component: NoticeListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationsPage, PushListComponent, NoticeListComponent],
})
export class NotificationsPageModule {}
