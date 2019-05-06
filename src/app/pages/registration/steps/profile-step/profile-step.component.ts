import { Component, OnInit } from '@angular/core';
import {TwilioService} from '../../../../services/twilio.service';
import {LocalizationService} from '../../../../localization.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegistrationService} from '../../registration.service';
import {WebAdminService} from '../../../../services/web-admin.service';
import {Country} from '../../../../models/country';
import {Language} from '../../../../models/language';

@Component({
  selector: 'app-step3',
  templateUrl: './profile-step.component.html',
  styleUrls: ['./profile-step.component.scss'],
})
export class ProfileStep implements OnInit {

  countries: Country[];
  languageList: Language[];
  currentLanguage;
  profileForm: FormGroup;
  constructor(private localization: LocalizationService, private reg: RegistrationService, private wa: WebAdminService) { }

  userTitle = 'Mr';

  ngOnInit() {
    this.profileForm = this.reg.getForm();
    this.profileForm.get('title').setValue(this.userTitle);
    this.wa.getCountries(this.localization.languageCode).subscribe(data => {
      this.countries = data;
    });
    this.currentLanguage = this.localization.languageCode;
    this.wa.getLanguages().subscribe(data => {
      this.languageList = data;
    });
  }

  changeLanguage(event) {
    // this.localization.changeLanguage(this.currentLanguage);
    // this.countries = this.local.getCountries(event.detail.value);
  }


  setUserTitle(value) {
    this.userTitle = value;
    this.profileForm.get('title').setValue(value);
  }

}
