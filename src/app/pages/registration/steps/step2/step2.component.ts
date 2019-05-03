import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TwilioService} from '../../../../services/twilio.service';
import {LocalizationService} from '../../../../localization.service';
import {RegistrationService} from '../../registration.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {

  phoneNumber: string;
  userCode: string;
  code: string;
  timer = 20;
  interval;

  constructor(private route: ActivatedRoute, private twilio: TwilioService, private reg: RegistrationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phoneNumber'];
      this.reg.getForm().get(['phoneNumber']).setValue(this.phoneNumber);
      this.sendSmsWithCode();
    });
  }

  resendCode() {
    this.code = undefined;
    this.sendSmsWithCode();
  }

  private sendSmsWithCode() {
    this.code = '1234';
    this.timer = 20;
    this.interval = setInterval(() => {
      this.timer = this.timer - 1;
      if (this.timer === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
    // this.twilio.sendSmsCode(this.phoneNumber, '987654321').subscribe(code => {
    //
    // });
  }
}
