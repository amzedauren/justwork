import { ProfileSecurityComponent } from './profile-security/profile-security.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProfilePage,
    ProfileDetailComponent,
    ProfileSecurityComponent
  ],
  entryComponents: [
    ProfileDetailComponent,
    ProfileSecurityComponent
  ]
})
export class ProfilePageModule {}
