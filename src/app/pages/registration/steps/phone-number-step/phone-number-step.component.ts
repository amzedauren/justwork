import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './phone-number-step.component.html',
  styleUrls: ['./phone-number-step.component.scss'],
})
export class PhoneNumberStep implements OnInit {

  phoneNumber: string;

  constructor() { }

  ngOnInit() {}

  isNextDisabled() {
    return !(this.phoneNumber && this.phoneNumber.length === 12);
  }

}
