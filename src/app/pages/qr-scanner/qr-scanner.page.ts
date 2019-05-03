import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Toast} from '@ionic-native/toast/ngx';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner, private toast: Toast, private navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log('start scanning');
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.cancelled) {
        this.onScanCanceled();
      } else {
        this.onScanSuccess(barcodeData.text);
      }
    }).catch(err => {
      this.onScanFail();
      console.log('Error', err);
    });
  }

  onScanSuccess(res: string) {
    // TODO
    this.toast.show('success: ' + res, '1000', 'center').subscribe(() => {});
    this.navCtrl.navigateBack('/home');
  }

  onScanFail() {
    // TODO
    this.toast.show('fail to read qr code!', '1000', 'center').subscribe(() => {});
    this.navCtrl.navigateBack('/home');
  }

  onScanCanceled() {
    // TODO
    this.toast.show('qr code scan canceled!', '1000', 'center').subscribe(() => {});
    this.navCtrl.navigateBack('/home');
  }
}
