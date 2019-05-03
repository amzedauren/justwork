import { Component, Input, OnInit } from '@angular/core';
import { MarketWatchService } from '../../../../services/market-watch.service';
import * as echarts from 'echarts';

@Component({
  selector: 'aix-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
})
export class TradeComponent implements OnInit {

  @Input('data') data: any;

  dates: any[] = [];
  prices: any[] = [];
  values: any[] = [];
  chartOption;

  constructor(private mwService: MarketWatchService) {
  }

  ngOnInit() {
    this.mwService.getChartData(this.data.secCode, new Date(), new Date()).subscribe(chartData => {
      chartData.forEach(d => {
        this.dates.push('');
        this.prices.push(d['price']);
        this.values.push(d['value']);
      });
      this.chartOption = this.chartOption = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: null,
          show: false,
        },
        yAxis: {
          show: false,
          type: 'value',
          boundaryGap: [0, 0]
        },
        series: [
          {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new (<any>echarts).graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }])
            },
            data: this.prices
          }
        ],
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
        },
      };
    });
  }

}
