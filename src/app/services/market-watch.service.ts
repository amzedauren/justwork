import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Stocks } from '../models/stocks';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketWatchService {

  constructor(private http: HttpService) {
    this.http = http.setPrefix(environment.serviceBusUrl, '/mw');
  }

  getStocks(): Observable<Stocks[]> {
    return this.http.get('/table/main').pipe(map(v => v.body));
  }

  getTradingSummary(secCode: string) {
    return this.http.get('/symbol/trading-summary/' + secCode).pipe(map(v => v.body));
  }

  getRandomGraphData() {
    let base = +new Date(1968, 9, 3);
    const oneDay = 24 * 3600 * 1000;
    const date = [];

    const data = [Math.random() * 300];

    for (let i = 1; i < 100; i++) {
      const now = new Date(base += oneDay);
      date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    return { data: data, date: date };
  }

  getChartData(secCode: string, dateFrom?: Date, dateTo?: Date) {
    const filter = {
      secCode: secCode,
      dateFrom: !!dateFrom ? dateFrom.toISOString() : new Date().toISOString(),
      dateTo: !!dateTo ? dateTo.toISOString() : new Date().toISOString()
    };

    return this.http.get('/chart-data', filter)
    .pipe(map(response => response.body));
  }
}
