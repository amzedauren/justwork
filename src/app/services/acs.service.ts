import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {UserToSave} from '../models/toSave/user-to-save';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcsService {

  constructor(private http: HttpService) {
    this.http = http.setPrefix(environment.serviceBusUrl, '/acs');
  }

  addUser(toSave: UserToSave) {
    return this.http.postMultipart('/user/add', toSave).pipe(map(v => v.body));
  }

}
