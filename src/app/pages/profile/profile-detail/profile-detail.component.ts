import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalizedPage } from '../../LocalizedPage';
import { LocalizationService } from '../../../localization.service';
import { FormBuilder } from '@angular/forms';
import { WebAdminService } from '../../../services/web-admin.service';
import { Country } from '../../../models/country';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent extends LocalizedPage implements OnInit {

  // noinspection JSUnusedGlobalSymbols
  toLocalize: { variable: string; key: string }[] = [
    {variable: 'profile_detail__personal_info', key: 'profile_detail__personal_info'},
    {variable: 'profile_detail__edit', key: 'profile_detail__edit'},
    {variable: 'profile_detail__save', key: 'profile_detail__save'},
    {variable: 'shared__mr', key: 'shared__mr'},
    {variable: 'shared__mrs', key: 'shared__mrs'},
    {variable: 'shared__miss', key: 'shared__miss'},
    {variable: 'shared__dr', key: 'shared__dr'},
    {variable: 'shared__name', key: 'shared__name'},
    {variable: 'shared__surname', key: 'shared__surname'},
    {variable: 'shared__iin', key: 'shared__iin'},
    {variable: 'shared__country', key: 'shared__country'},
    {variable: 'shared__email_address', key: 'shared__email_address'},
  ];

  profile_detail__personal_info;
  profile_detail__edit;
  profile_detail__save;

  shared__mr;
  shared__mrs;
  shared__miss;
  shared__dr;
  shared__name;
  shared__surname;
  shared__iin;
  shared__country;
  shared__email_address;

  editMode = false;

  personInfoForm = this.fb.group({
    title: [''],
    name: [''],
    surname: [''],
    iin: [''],
    email: [''],
    country: [''],
  });

  countries: Country[];

  constructor(private wa: WebAdminService,
      private fb: FormBuilder,
      private modalController: ModalController,
      public localization: LocalizationService) {super(localization); }

  ngOnInit() {
    super.ngOnInit();
    this.getCountries();
    this.initPersonInfo();
  }

  async getCountries() {
    this.countries = await this.wa.getCountries(this.localization.languageCode).toPromise();
  }

  initPersonInfo() {
    // todo get person info
    this.personInfoForm.get('title').setValue('Mr');
    this.personInfoForm.get('name').setValue('Depp');
    this.personInfoForm.get('surname').setValue('Johny');
    this.personInfoForm.get('iin').setValue('123456789');
    this.personInfoForm.get('email').setValue('johny@aix.kz');
    this.personInfoForm.get('country').setValue('KZ');
  }

  closeModal() {
    if (this.editMode) {
      this.editMode = false;
      this.initPersonInfo();
    } else {
      this.modalController.dismiss();
    }
  }

  save() {
    // todo save personInfo
    this.editMode = false;
    this.initPersonInfo(); // todo remove
  }

  setEditMode() {
    this.editMode = true;
  }

}
