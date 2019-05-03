import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Broker } from '../models/Broker';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Trade } from '../models/Trade';
import { TradeHistoryFilter } from '../models/TradeHistoryFilter';

@Injectable({
  providedIn: 'root'
})
export class CsdService {

  constructor(private http: HttpService) {
    this.http = http.setPrefix(environment.serviceBusUrl, '/csd');
  }

  getBrokers(): Observable<Broker[]> {
    // TODO: use proper parameters
    const parameters = {
      shortName: 'shortName',
      shortCode: 'shortCode',
      state: 'state',
    };
    return this.http.get('/brokers', parameters)
    .pipe(map(response => response.body as Broker[]));
  }

  getTrades(filter: TradeHistoryFilter): Observable<Trade[]> {
    return this.http.get('/trades', filter as {})
    .pipe(map(response => response.body as Trade[]));
  }

  generate(): Promise<string> {
    return this.http.get('/generate/code/2nd-factor', { mobileNumber: 'mobileNumber', userName: 'userName' })
    .toPromise()
    .then(response => response.body['Code'] as string);
  }
}
