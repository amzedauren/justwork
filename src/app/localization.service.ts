import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { Storage } from '@ionic/storage';
import { WebAdminService } from './services/web-admin.service';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { HttpService } from './services/http.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  public static readonly LANGUAGE_CODE = 'LANGUAGE_CODE1' + Math.random(); // TODO remove math random
  public static readonly LANGUAGE_VERSION = 'LANGUAGE_VERSION_'; // KZ_LANGUAGE_VERSION, EN_LANGUAGE_VERSION ...
  public static readonly TRANSLATES_LANG = 'TRANSLATES_'; // TRANSLATES_KZ, TRANSLATES_EN ...

  translatesUpdatedSubject = new Subject();

  // если будет медленно, можно будет каждый ключ хранить отдельно в методе setLanguage, и переписать метод localString(string)
  private translates = {};
  languageCode = 'en';

  constructor(
    private loading: LoadingService,
    private storage: Storage,
    private wa: WebAdminService,
    private http: HttpService) {}

  localString(key: string) {
    return this.translates[key];
  }

  private async firstInit() {
    const code = environment.defaultLanguage;
    const local = await this.getLocalTranslate();
    await this.setLanguage(code, local.translates, local.version);
    return {code: code, version: local.version};
  }

  async init() {
    let code = await this.fromStorage(LocalizationService.LANGUAGE_CODE);
    let version = await this.fromStorage(this.langVersionKey(code));
    // console.log('localization init ', code, version);

    if (!code) {  // приложение первый раз запущен ини очистили память приложения
      const res = await this.firstInit();
      code = res.code;
      version = res.version;
    }
    this.languageCode = code;

    await this.updateTranslatesArray(code);
  }

  async changeLanguage(code: string) {
    // this.loading.present();

    this.languageCode = code;
    await this.intoStorage(LocalizationService.LANGUAGE_CODE, code);
    await this.updateTranslatesArray(code);

    // this.loading.dismis();
  }

  async updateTranslatesArray(code: string) {
    const langVersion = await this.fromStorage(this.langVersionKey(code));
    let temp;
    if (langVersion) {
      const needUpdate = false; // await this.checkLanguage(code, langVersion); todo вернуть что бы работал с сервером
      // console.log('needUpdate', needUpdate);
      if (needUpdate) {
        temp = await this.updateLanguage(code);
      } else {
        temp = await this.fromStorage(this.translatesKey(code));
      }
      // console.log('temp', temp);
    } else {
      temp = await this.updateLanguage(code);
    }

    this.translates = {};
    for (let i = 0; i < temp.length; i++) {
      this.translates[temp[i]['code']] = temp[i]['title'];
    }
    this.translatesUpdatedSubject.next();
  }

  async updateLanguage(code: string) {
    const res = await this.getServerTranslate(code);
    const version = res.version;
    await this.setLanguage(code, res.translates, version);
    return res.translates;
  }

  checkLanguage(code, version) {
    return this.wa.checkLanguage(code, version).toPromise();
  }

  private async setLanguage(code, translates, version) {
    await this.intoStorage(this.translatesKey(code), translates);
    await this.intoStorage(LocalizationService.LANGUAGE_CODE, code);
    await this.intoStorage(this.langVersionKey(code), version);
    // console.log('setLanguage', this.translatesKey(code), translates,
    //   LocalizationService.LANGUAGE_CODE, code,
    //   this.langVersionKey(code), version);
  }

  private getServerTranslate(code: string) {
    return this.wa.getTranslates(code).toPromise();
  }

  private getLocalTranslate() {
    return this.http.get('assets/dictionary.json').pipe(map(res => res.body)).toPromise();
  }

  private intoStorage(key, value) {
    return this.storage.set(key, value);
  }

  private fromStorage(key) {
    return this.storage.get(key);
  }

  // noinspection JSMethodCanBeStatic
  langVersionKey(code: string) {
    return LocalizationService.LANGUAGE_VERSION + code;
  }

  // noinspection JSMethodCanBeStatic
  translatesKey(code: string) {
    return LocalizationService.TRANSLATES_LANG + code;
  }
}
