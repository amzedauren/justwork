import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { getOrDefault } from '../../../../util/UtilMethods';

@Component({
  selector: 'app-simple-picker',
  templateUrl: './simple-picker.component.html',
  styleUrls: ['./simple-picker.component.scss'],
})
export class SimplePickerComponent implements OnInit {

  title: string;

  optionIdKey: string;
  optionTitleKey: string;

  pickOptions: any[];
  pickedOption: any;

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController) {
  }

  ngOnInit() {
    const { title, optionIdKey, optionTitleKey, pickOptions, pickedOption } = this.navParams.data;
    this.title = title;
    this.pickedOption = pickedOption;
    this.pickOptions = pickOptions;
    this.optionIdKey = getOrDefault(optionIdKey, 'id');
    this.optionTitleKey = getOrDefault(optionTitleKey, 'title');
  }

  close() {
    this.modalCtrl.dismiss();
  }

  pickOption(option: any) {
    this.pickedOption = option;
    this.modalCtrl.dismiss({
      pickedOption: this.pickedOption
    });
  }
}
