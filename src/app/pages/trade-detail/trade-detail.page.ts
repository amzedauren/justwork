import { Component, OnInit } from '@angular/core';
import { AixService } from '../../services/aix.service';
import { MarketWatchService } from '../../services/market-watch.service';
import { ActivatedRoute } from '@angular/router';
import { EChartOption } from 'echarts';
import { shorten } from '../../util/UtilMethods';

@Component({
  selector: 'app-trade-detail',
  templateUrl: './trade-detail.page.html',
  styleUrls: ['./trade-detail.page.scss'],
})
export class TradeDetailPage implements OnInit {

  stocks: any[];
  secCode: string;
  tradingSummary = {};

  data: number[] = [];

  dates: any[] = [];
  prices: number[] = [];
  values: number[] = [];

  chartOption: EChartOption;

  readonly today = new Date();

  dateFilterOptions: any = [
    {
      title: 'day',
      dateFrom: this.getDateBefore(0),
      dateTo: this.today
    },
    {
      title: 'week',
      dateFrom: this.getDateBefore(7),
      dateTo: this.today
    },
    {
      title: 'month',
      dateFrom: this.getDateBefore(31),
      dateTo: this.today
    },
    {
      title: 'year',
      dateFrom: this.getDateBefore(365),
      dateTo: this.today
    }
  ];

  constructor(private aixService: AixService, private mw: MarketWatchService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.secCode = params['secCode'];
    });
  }

  ngOnInit() {
    this.onDateFilterTap(this.dateFilterOptions[0]);
    this.updateStockData();
    this.updateTradingSummary();
  }

  private updateChartData(dateFrom?: Date, dateTo?: Date) {
    this.mw.getChartData(this.secCode, dateFrom, dateTo).subscribe(chartData => {
      this.dates = [];
      this.prices = [];
      this.values = [];
      chartData.forEach(d => {
        this.dates.push('');
        this.prices.push(d['price']);
        this.values.push(d['value']);
      });
      this.chartOption = {
        xAxis: [
          {
            type: 'category',
            data: this.dates,
            splitNumber: 20,
          },
          {
            type: 'category',
            gridIndex: 1,
            scale: true,
            boundaryGap: false,
            splitNumber: 20,
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitNumber: 12,
            min: Math.min(...this.prices) + 100
          },
          {
            type: 'value',
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {
              formatter: (v) => {
                return shorten(v, 3, false, false);
              }
            }
          }
        ],
        series: [
          {
            data: this.prices,
            type: 'line',
            smooth: true
          },
          {
            name: 'value',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: this.values,
            animation: false
          }
        ],
        grid: [
          {
            left: 50,
            top: 10,
            height: '50%',
          },
          {
            left: 50,
            top: '66%',
            height: '30%'
          },
        ]
      };
    });
  }

  updateStockData() {
    this.mw.getStocks().subscribe((data) => {
      this.stocks = data;
    });
  }

  updateTradingSummary() {
    this.mw.getTradingSummary(this.secCode).subscribe(data => {
      this.tradingSummary = data;
    });
  }

  getDateBefore(days: number) {
    const dateBefore = new Date();
    dateBefore.setDate(this.today.getDate() - days);
    return dateBefore;
  }

  onDateFilterTap(filter: any) {
    this.updateChartData(filter.dateFrom, filter.dateTo);
  }
}
