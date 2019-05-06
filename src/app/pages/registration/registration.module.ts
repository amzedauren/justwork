import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import {SmsStep} from './steps/sms-step/sms-step.component';
import {PhoneNumberStep} from './steps/phone-number-step/phone-number-step.component';
import {ProfileStep} from './steps/profile-step/profile-step.component';
import {PatternStep} from './steps/pattern-step/pattern-step.component';
import {RegistrationService} from './registration.service';
import {LastStepComponent} from './steps/last-step/last-step.component';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {BiometricStep} from "./steps/biometric-step/biometric-step.component";


const routes: Routes = [
  {
    path: '',
    component: RegistrationPage,
    children: [
      {
        path: '',
        redirectTo: 'phone-number-step'
      },
      {
        path: 'phone-number-step',
        component: PhoneNumberStep
      },
      {
        path: 'sms-step',
        component: SmsStep
      },
      {
        path: 'profile-step',
        component: ProfileStep
      },
      {
        path: 'pattern-step',
        component: PatternStep
      },
      {
        path: 'biometric-step',
        component: BiometricStep
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
    SmsStep,
    PhoneNumberStep,
    ProfileStep,
    PatternStep,
    LastStepComponent,
    BiometricStep
  ],
  providers: [RegistrationService, FingerprintAIO]
})
export class RegistrationPageModule {}
