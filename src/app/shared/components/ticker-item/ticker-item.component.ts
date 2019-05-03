import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import { MarketWatchService } from '../../../services/market-watch.service';

@Component({
  selector: 'app-ticker-item',
  templateUrl: './ticker-item.component.html',
  styleUrls: ['./ticker-item.component.scss'],
})
export class TickerItemComponent implements OnInit {

  @Input('data') data: any;

  chartData: any[];

  dates: any[] = [];
  prices: number[] = [];
  values: number[] = [];

  chartOption: EChartOption;


  constructor(private mw: MarketWatchService) {
  }

  ngOnInit() {
    this.mw.getChartData(this.data.secCode).subscribe(chartData => {
      chartData.forEach(d => {
        this.dates.push('');
        this.prices.push(d['price']);
        this.values.push(d['value']);
      });
      this.chartOption = {
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

  private udpateChartData() {
    const rnd = this.mw.getRandomGraphData();
    this.chartOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: rnd.date,
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
          data: this.chartData
        }
      ],
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
    };
  }
}
