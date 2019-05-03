import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Language} from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class WebAdminService {

  constructor(private http: HttpService) {
    this.http = http.setPrefix(environment.webAdminUrl);
  }

  getAboutUs(): Observable<{id: string; title: string; text: string}> {
    return this.http.get('/about-us').pipe(map(v => v.body));
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get('/language').pipe(map(v => v.body));
  }

  checkLanguage(code: any, version: any) {
    return this.http.get('/language/check', {
      languageCode: code,
      version: version
    }).pipe(map(v => v.body));
  }

  getTranslates(code: string) {
    return this.http.get('/language/translate', { languageCode: code }).pipe(map(v => v.body));
  }

  getAixContacts(languageCode: string) {
    return this.http.get('/contact', {
      languageCode: languageCode
    }).pipe(map(v => v.body));
  }

  getCountries(languageCode: string) {
    return this.http.get('/country/list', {
      languageCode: languageCode
    }).pipe(map(v => v.body));
  }

  getHelpList(languageCode: string) {
    return this.http.get('/help/list', {
      languageCode: languageCode
    }).pipe(map(v => v.body));
  }

  getHelMessage(helperId: string, languageCode: string) {
    return this.http.get('/help/message', {
      languageCode: languageCode,
      helperId: helperId
    }).pipe(map(v => v.body));
  }

  sendMessage(toSave: { phoneNumber: any; countryCode: any; name: any; message: any; email: any }) {
    return this.http.post('/contact/save', { toSave: JSON.stringify(toSave)});
  }


}
