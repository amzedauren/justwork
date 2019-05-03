import {Component, OnInit} from '@angular/core';
import {WebAdminService} from '../../services/web-admin.service';
import {Language} from '../../models/language';
import {LocalizationService} from '../../localization.service';
import {LocalizedPage} from '../LocalizedPage';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
})
export class ChangeLanguagePage extends LocalizedPage implements OnInit {

  // noinspection JSUnusedGlobalSymbols
  toLocalize = [{variable: 'pageTitle', key: 'language__title'}];

  pageTitle: string;
  languages: Language[];
  languageCode: string;

  constructor(
    public localization: LocalizationService,
    private wa: WebAdminService) {
    super(localization);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getCurrentLanguageCode();
    this.getLanguages();
    console.log('languageCode', this.languageCode);
  }

  getLanguages() {
    this.wa.getLanguages().subscribe(data => {
      this.languages = data;
    });
  }

  setLangChecked(i: number) {
    setTimeout(() => {
      this.languages[i]['isChecked'] = true;
    }, 150);
  }

  getCurrentLanguageCode() {
    this.languageCode = this.localization.languageCode;
    console.log('getCurrentLanguageCode', this.languageCode);
  }

  changeLanguage(code: string, index: number) {
    console.log(code);
    if (code === this.languageCode) {
      setTimeout(() => {
        this.languages[index].code = this.languages[index].code;
      }, 150);
      // this.setLangChecked(index);
      return;
    }

    this.languageCode = code;
    // noinspection JSIgnoredPromiseFromCall
    this.localization.changeLanguage(code);

  }

  localizePage() {
    super.localizePage();
    this.getCurrentLanguageCode();
  }


}
