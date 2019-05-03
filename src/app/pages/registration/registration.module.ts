import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import {Step2Component} from './steps/step2/step2.component';
import {Step1Component} from './steps/step1/step1.component';
import {Step3Component} from './steps/step3/step3.component';
import {Step4Component} from './steps/step4/step4.component';
import {RegistrationService} from './registration.service';
import {LastStepComponent} from './steps/last-step/last-step.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage,
    children: [
      {
        path: '',
        redirectTo: 'step1'
      },
      {
        path: 'step1',
        component: Step1Component
      },
      {
        path: 'step2',
        component: Step2Component
      },
      {
        path: 'step3',
        component: Step3Component
      },
      {
        path: 'step4',
        component: Step4Component
      },
      {
        path: 'last-step',
        component: LastStepComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegistrationPage,
    Step2Component,
    Step1Component,
    Step3Component,
    Step4Component,
    LastStepComponent,
  ],
  providers: [RegistrationService]
})
export class RegistrationPageModule {}
