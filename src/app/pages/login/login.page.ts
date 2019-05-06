import { Component, OnInit } from '@angular/core';
import {LocalizationService} from '../../localization.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  currentLanguage: string;

  constructor(public localization: LocalizationService, private faio: FingerprintAIO) { }

  ngOnInit() {
    this.currentLanguage = this.localization.languageCode;
  }

  loginBio() {
    this.faio.isAvailable().then(data => {
      console.log(data);
    });
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup:true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
        .then((result: any) => console.log(result))
        .catch((error: any) => console.log(error));
  }

}
