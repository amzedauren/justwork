import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild("input1") inputE1;
  @ViewChild("input2") inputE2;
  @ViewChild("input3") inputE3;
  @ViewChild("input4") inputE4;

  phoneNumber: string;
  userCode: string;
  verificationCode: string;
  timer = 5;
  interval;
  inputValues = [-1,-1,-1,-1];
  canGoNext: boolean = false;

  constructor(private route: ActivatedRoute, private twilio: TwilioService, private reg: RegistrationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phoneNumber'];
      this.reg.getForm().get(['phoneNumber']).setValue(this.phoneNumber);
      this.sendSmsWithCode();
    });
  }

  resendCode() {
    if (this.timer == 0) {
      clearInterval(this.interval);
      this.verificationCode = undefined;
      this.sendSmsWithCode();
    }
  }

  private sendSmsWithCode() {
    this.verificationCode = '1234';
    this.timer = 5;
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

  toInput(n: number, event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    const value = charCode - 48;
    this.inputValues[n-1] = value;
    this.canGoNext = this.inputValues[0] == Number(this.verificationCode[0]) &&
        this.inputValues[1] == Number(this.verificationCode[1]) &&
        this.inputValues[2] == Number(this.verificationCode[2]) &&
        this.inputValues[3] == Number(this.verificationCode[3]);

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    if(n === 4) {
      setTimeout(()=>{
        this.inputE4.nativeElement.blur() ;
      }, 0)
    } else {
      setTimeout(()=>{
        this['inputE' + (n+1)].nativeElement.focus();
      },0);
    }
    return true;
  }

  onInputFocus(n) {
    this['inputE' + n].nativeElement.select();
  }
}
