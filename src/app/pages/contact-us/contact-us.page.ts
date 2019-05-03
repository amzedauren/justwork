import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LocalizedPage} from '../LocalizedPage';
import {LocalizationService} from '../../localization.service';
import {WebAdminService} from '../../services/web-admin.service';
import {AuthService} from '../../services/auth.service';
import {ModalController, ToastController} from '@ionic/angular';
import {NewsDetailComponent} from '../../shared/components/news-detail/news-detail.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage extends LocalizedPage implements OnInit {

  toLocalize = [
    {variable: 'contact_us__title', key: 'contact_us__title'},
    {variable: 'contact_us__aix', key: 'contact_us__aix'},
    {variable: 'contact_us__contacts', key: 'contact_us__contacts'},
    {variable: 'contact_us__get_in_touch', key: 'contact_us__get_in_touch'},
    {variable: 'contact_us__terms_common', key: 'contact_us__terms_common'},
    {variable: 'contact_us__and', key: 'contact_us__and'},
    {variable: 'term_of_use__title', key: 'term_of_use__title'},
    {variable: 'privacy_police__title', key: 'privacy_police__title'},
    {variable: 'contact_us__send', key: 'contact_us__send'},
    {variable: 'contact_us__name', key: 'contact_us__name'},
    {variable: 'contact_us__email', key: 'contact_us__email'},
    {variable: 'contact_us__country', key: 'contact_us__country'},
    {variable: 'contact_us__telephone', key: 'contact_us__telephone'},
    {variable: 'contact_us__message', key: 'contact_us__message'},
    {variable: 'toastMessage', key: 'contact_us__get_in_touch_success'}
  ];

  contact_us__title: string;
  contact_us__aix: string;
  contact_us__contacts: string;
  contact_us__get_in_touch: string;

  contact_us__terms_common: string;
  contact_us__and: string;
  term_of_use__title: string;
  privacy_police__title: string;

  contact_us__send: string;
  contact_us__name: string;
  contact_us__email: string;
  contact_us__country: string;
  contact_us__telephone: string;
  contact_us__message: string;

  aix_address: string;
  aix_email: string;
  aix_phone: string;

  toastMessage: string;

  authorized = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    countryCode: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    message: ['', Validators.required],
  });

  confirmed = false;

  constructor(
    private fb: FormBuilder,
    private wa: WebAdminService,
    public localization: LocalizationService,
    private auth: AuthService,
    private toast: ToastController,
    private modalCtrl: ModalController) { super(localization); }

  ngOnInit() {
    super.ngOnInit();
    this.initContent();
    this.initForm();
  }

  initContent() {
    this.wa.getAixContacts(this.localization.languageCode).subscribe(data => {
      this.aix_email = data['email'];
      this.aix_address = data['address'];
      this.aix_phone = data['telephone'];
    });
  }

  send() {
    const raw = this.form.getRawValue();
    const toSave = {
      name: raw['name'],
      phoneNumber: raw['phoneNumber'],
      email: raw['email'],
      message: raw['message'],
      countryCode: raw['countryCode']
    };
    this.wa.sendMessage(toSave).subscribe(() => {
      this.onSendSuccess();
    });
  }

  private async initForm() {
    this.authorized = await this.auth.isAuthorized();
    if (this.authorized) {
      const contacts = await this.auth.getUserContacts();
      this.form.get('name').setValue(contacts['name']);
      this.form.get('email').setValue(contacts['email']);
      this.form.get('country').setValue(contacts['country']);
      this.form.get('telephone').setValue(contacts['telephone']);
    }
  }

  async onSendSuccess() {
    const toast = await this.toast.create({
      message: this.toastMessage,
      duration: 2000
    });
    toast.present();
    this.form.get('message').setValue('');
  }

  async showTerms() {
    const modal = await this.modalCtrl.create({
      component: NewsDetailComponent,
      componentProps: {data: ''} // TODO
    });
    modal.present();
  }
}
