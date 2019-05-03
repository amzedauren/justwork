import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  present() {
    this.presentLoading();
  }

  dismis() {
    this.dismis();
  }

  private async dismisLoading() {
    this.loadingController.dismiss();
  }

  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'please wait...',
    });
    loading.present();
  }

}
