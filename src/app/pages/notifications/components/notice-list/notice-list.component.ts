import { Component, OnInit } from '@angular/core';
import {AixService} from '../../../../services/aix.service';
import {ModalController} from '@ionic/angular';
import {News} from '../../../../models/news';
import {NewsDetailComponent} from '../../../../shared/components/news-detail/news-detail.component';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.scss'],
})
export class NoticeListComponent implements OnInit {

  list;
  constructor(private aix: AixService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.aix.getNotices().subscribe(data => {
      this.list = data;
    });
  }

  async showNotice(notice) {
    const modal = await this.modalCtrl.create({
      component: NewsDetailComponent,
      componentProps: { data: notice}
    });
    modal.present();
  }

}
