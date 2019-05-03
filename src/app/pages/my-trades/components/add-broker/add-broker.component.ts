import { Component, OnInit } from '@angular/core';
import { Broker } from '../../../../models/Broker';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-broker',
  templateUrl: './add-broker.component.html',
  styleUrls: ['./add-broker.component.scss'],
})
export class AddBrokerComponent implements OnInit {

  brokers: Broker[] = [
    {
      'ID': '1',
      'STATE': 'Active',
      'SHORTCODE': 'shortcode',
      'NAME': 'Halyk Finance',
      'TYPE': 'type',
      'FULLNAME': 'full name',
      'MEMBERCODE': 'membercode',
      'REGNO': 'reg number',
      'ADDRESS1': 'add1',
      'ADDRESS2': 'add2',
      'POSTCODE': 'postcode',
      'COUNTRY': 'country',
      'EMAIL': 'email',
      'PHONE': 777846512,
      'MOBILE': 5548774562,
      'MARKETCHCK': 'marketchk',
      'DEFACCOUNT': 'def account'
    },
    {
      'ID': '2',
      'STATE': 'Active',
      'SHORTCODE': 'shortcode',
      'NAME': 'Freedon Finance',
      'TYPE': 'type',
      'FULLNAME': 'full name',
      'MEMBERCODE': 'membercode',
      'REGNO': 'reg number',
      'ADDRESS1': 'add1',
      'ADDRESS2': 'add2',
      'POSTCODE': 'postcode',
      'COUNTRY': 'country',
      'EMAIL': 'email',
      'PHONE': 777846512,
      'MOBILE': 5548774562,
      'MARKETCHCK': 'marketchk',
      'DEFACCOUNT': 'def account'
    },
  ];

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
