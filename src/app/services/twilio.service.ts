import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  constructor(private http: HttpService) {
    this.http = http.setPrefix(environment.serviceBusUrl, '/twilio');
  }

  sendSmsCode(receiverNumber: string, body: string) {
    return this.http.postJson('/send-sms', {body: body, receiverNumber: receiverNumber}, 'text').pipe(map(v => v.body));
  }
}
