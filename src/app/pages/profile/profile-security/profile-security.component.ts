import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalizedPage } from '../../LocalizedPage';
import { LocalizationService } from 'src/app/localization.service';
import {StorageKeys} from '../../../storage-keys';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile-security',
  templateUrl: './profile-security.component.html',
  styleUrls: ['./profile-security.component.scss'],
})
export class ProfileSecurityComponent extends LocalizedPage implements OnInit {

  toLocalize = [
    {variable: 'security__title', key: 'security__title'},
    {variable: 'security__change_number', key: 'security__change_number'},
    {variable: 'security__change_password', key: 'security__change_password'},
    {variable: 'security__face_id', key: 'security__face_id'},
    {variable: 'security__pattern', key: 'security__pattern'},
  ];

  security__title: string;
  security__change_number: string;
  security__change_password: string;
  security__face_id: string;
  security__pattern: string;

  canUseFaceId = true; // todo check
  useFaceId: boolean;
  usePattern: boolean;

  initialized = false;



  constructor(public localization: LocalizationService, private modalController: ModalController, private storage: Storage) {
    super(localization);
  }

  ngOnInit() {
    super.ngOnInit();
    this.init();
  }

  async init() {
    await this.storage.get(StorageKeys.CAN_USE_FACE_ID).then(value => this.canUseFaceId = value);
    await this.storage.get(StorageKeys.SECURITY_USE_FACE_ID).then(value => this.useFaceId = value);
    await this.storage.get(StorageKeys.SECURITY_USE_PATTERN).then(value => this.usePattern = value);

    this.initialized = true;
  }

  closeModal() {
    this.modalController.dismiss();
  }

  toggleFaceId() {
    this.storage.set(StorageKeys.SECURITY_USE_FACE_ID, this.useFaceId);
  }

  togglePattern() {
    this.storage.set(StorageKeys.SECURITY_USE_PATTERN, this.usePattern);
  }

}
