import { Component, OnInit } from '@angular/core';
import {TwilioService} from '../../services/twilio.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {LocalizedPage} from '../LocalizedPage';
import {LocalizationService} from '../../localization.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage extends LocalizedPage implements OnInit {

  toLocalize: { variable: string; key: string }[] = [
    {variable: 'forgot_pass__success_text', key: 'forgot_pass__success_text'},
    {variable: 'forgot_pass__title', key: 'forgot_pass__title'},
    {variable: 'forgot_pass__tutorial1', key: 'forgot_pass__tutorial1'},
    {variable: 'forgot_pass__tutorial2', key: 'forgot_pass__tutorial2'},
    {variable: 'forgot_pass__receive_sms', key: 'forgot_pass__receive_sms'},
    {variable: 'forgot_pass__send_sms_again', key: 'forgot_pass__send_sms_again'},
    {variable: 'forgot_pass__enter_sms_code', key: 'forgot_pass__enter_sms_code'},
    {variable: 'shared__phone_number', key: 'shared__phone_number'},
    {variable: 'shared__new_pass', key: 'shared__new_pass'},
    {variable: 'shared__repeat_pass', key: 'shared__repeat_pass'},
    {variable: 'shared__save', key: 'shared__save'},
  ];

  constructor(private twilio: TwilioService,
              private router: Router,
              private toast: ToastController,
              public localization: LocalizationService) {
    super(localization);
  }

  forgot_pass__success_text;
  forgot_pass__title;
  forgot_pass__tutorial1;
  forgot_pass__tutorial2;
  forgot_pass__receive_sms;
  forgot_pass__send_sms_again;
  forgot_pass__enter_sms_code;

  shared__phone_number;
  shared__new_pass;
  shared__repeat_pass;
  shared__save;

  smsSent: boolean;

  timer_init = 3;
  timer = this.timer_init;
  interval;

  phoneNumber = '';

  pass1: string;
  pass2: string;

  smsCode: string;
  smsCode_real: string;

  ngOnInit() {
    super.ngOnInit();
  }

  sendSms() {
    // todo send sms
    this.smsSent = true;
    this.timer = this.timer_init;
    this.smsCode_real = '1234';
    this.interval = setInterval(() => {
      this.timer = this.timer - 1;
      if (this.timer === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  async resetPassword() {
    // todo
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigateByUrl('/login');

    const toast = await this.toast.create({
      message: this.forgot_pass__success_text,
      duration: 2000
    });
    toast.present();
  }


}
