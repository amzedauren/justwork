import {Component, OnInit, ViewChild} from '@angular/core';
import {News} from '../../../models/news';
import {NewsDetailComponent} from '../news-detail/news-detail.component';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {AixService} from '../../../services/aix.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data = [];
  offset = 0;
  perPage = 5;
  subs: Subscription;

  constructor(private modalCtrl: ModalController, private aix: AixService) { }

  ngOnInit() {
    this.updateNews();
  }

  async onCardClicked(i: News) {
    const modal = await this.modalCtrl.create({
      component: NewsDetailComponent,
      componentProps: { data: i}
    });
    modal.present();
  }


  updateNews() {
    this.subs = this.aix.getNews(this.offset, this.perPage).subscribe(next => {
      this.infiniteScroll.complete();
      if (next && next['length'] && next['length'] > 0) {
        this.data = this.data.concat(next);
        this.offset += this.perPage;
      }
    });
  }

  loadData(event) {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    this.updateNews();
  }

}
