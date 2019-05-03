import { Component, OnInit } from '@angular/core';
import {LocalizationService} from '../../localization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  currentLanguage: string;

  constructor(public localization: LocalizationService) { }

  ngOnInit() {
    this.currentLanguage = this.localization.languageCode;
  }

}
