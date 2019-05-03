import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AixService {

  constructor(private http: HttpService) {
    this.http = http.setPrefix(environment.serviceBusUrl, '/aix');
  }

  getNews(offset: number, perPage: number) {
    return this.http.get('/news', {
      offset: offset,
      perPage: perPage
    }).pipe(map(v => v.body));
  }

  getNotices() {
    return this.http.get('/market-notices').pipe(map(v => v.body));
  }

  getDisclosures(secCode: string, offset: number, perPage: number) {
    return this.http.get('/company-disclosures', {
      code: secCode,
      offset: offset,
      perPage: perPage
    }).pipe(map(v => v.body));
  }

  getDiscAttachments(id: any) {
    return this.http.get('/company-disclosures/attachment', {disclosure_id: id}).pipe(map(v => v.body));

  }
}
