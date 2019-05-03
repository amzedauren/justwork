import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { getOrDefault } from '../../../../../../util/UtilMethods';
import { PeriodFilter } from '../../../../../../models/PeriodFilter';

@Component({
  selector: 'app-period-filter-component',
  templateUrl: './period-filter-component.component.html',
  styleUrls: ['./period-filter-component.component.scss'],
})
export class PeriodFilterComponentComponent implements OnInit {

  dateTo: Date;
  dateFrom: Date;

  pickerDateTo: Date;
  pickerDateFrom: Date;
  dateToPickerOptions: any;
  dateFromPickerOptions: any;

  isCustom: boolean;

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.setAttributes();
    this.initPickerOptions();
  }

  private setAttributes() {
    const { dateFrom, dateTo, isCustom } = this.navParams.data.periodFilter;
    this.dateTo = getOrDefault(dateTo, null);
    this.dateFrom = getOrDefault(dateFrom, null);
    this.isCustom = getOrDefault(isCustom, false);
    if (!!this.isCustom) {
      this.pickerDateTo = this.dateTo;
      this.pickerDateFrom = this.dateFrom;
    }
  }

  private initPickerOptions() {
    this.dateFromPickerOptions = {
      buttons: [{
        text: 'Done',
        handler: date => {
          this.setPickerCustom('pickerDateFrom', date);
        }
      }]
    };
    this.dateToPickerOptions = {
      buttons: [{
        text: 'Done',
        handler: date => {
          this.setPickerCustom('pickerDateTo', date);
        }
      }]
    };
  }

  private setPickerCustom(dateToUpdateKey: string, pickerDate: any) {
    this[dateToUpdateKey] = new Date();
    this[dateToUpdateKey].setDate(pickerDate.day.value);
    this[dateToUpdateKey].setMonth(pickerDate.month.value - 1);
    this[dateToUpdateKey].setFullYear(pickerDate.year.value);
    this.setCustom();
  }

  dateDifference() {
    if (!this.dateFrom || !this.dateTo) {
      return -1;
    }
    const diffTime = Math.abs(this.dateFrom.getTime() - this.dateTo.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  setWeek() {
    this.setDatesByDayDiff(7);
  }

  setMonth() {
    this.setDatesByDayDiff(31);
  }

  set3Month() {
    this.setDatesByDayDiff(92);
  }

  setYear() {
    this.setDatesByDayDiff(365);
  }

  private setDatesByDayDiff(dayDiff: number) {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.dateTo.setDate(this.dateFrom.getDate() + dayDiff);
    this.isCustom = false;
  }

  setCustom() {
    this.isCustom = true;
    this.dateFrom = this.pickerDateFrom;
    this.dateTo = this.pickerDateTo;
    console.log(this.pickerDateFrom, this.pickerDateTo);
  }

  close() {
    this.modalCtrl.dismiss({
      apply: true, // TODO: clearify UX 
      periodFilter: {
        dateTo: this.dateTo,
        dateFrom: this.dateFrom,
        isCustom: this.isCustom
      } as PeriodFilter
    });
  }
}
