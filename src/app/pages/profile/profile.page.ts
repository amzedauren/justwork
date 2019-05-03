import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocalizationService } from '../../localization.service';
import { WebAdminService } from 'src/app/services/web-admin.service';
import { LocalizedPage } from '../LocalizedPage';
import { ProfileSecurityComponent } from './profile-security/profile-security.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends LocalizedPage implements OnInit {

  toLocalize = [
    {variable: 'profile__title', key: 'profile__title'},
    {variable: 'profile__info', key: 'profile__info'},
    {variable: 'profile__password', key: 'profile__password'},
    {variable: 'profile__info_content', key: 'profile__info_content'},
    {variable: 'profile__password_content', key: 'profile__password'},
    {variable: 'profile__log_out', key: 'profile__log_out'},
  ];

  profile__title: string;
  profile__info: string;
  profile__info_content: string;
  profile__password: string;
  profile__password_content: string;
  profile__log_out: string;

  telephone: string;
  name: string;
  surname: string;
  title_person: string;

  constructor(
    public localization: LocalizationService,
    private storage: Storage,
    private modalCtrl: ModalController) { super(localization); }

  ngOnInit() {
    super.ngOnInit();
    this.initContent();
  }

  initContent() {
    this.storage.get('telephone').then(value => this.telephone = value || '+77772127898');
    this.storage.get('name').then(value => this.name = value || 'Johny');
    this.storage.get('surname').then(value => this.surname = value || 'Depp');
    this.storage.get('title_person').then(value => this.title_person = value || 'Mr');
  }

  async openProfileInfo() {
    const modal = await this.modalCtrl.create({
      component: ProfileDetailComponent,
    });
    modal.present();
  }

  async openPasswordInfo() {
    const modal = await this.modalCtrl.create({
      component: ProfileSecurityComponent,
    });
    modal.present();
  }
}
