import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {DisclosureDetailComponent} from '../disclosure-detail/disclosure-detail.component';
import {AixService} from '../../../services/aix.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-disclosure-list',
  templateUrl: './disclosure-list.component.html',
  styleUrls: ['./disclosure-list.component.scss'],
})
export class DisclosureListComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input('secCode') secCode;
  data = [];
  page = 0;
  perPage = 2;
  subs: Subscription;

  constructor(private modalCtrl: ModalController, private aix: AixService) { }

  ngOnInit() {
    this.updateList();
  }

  async onCardClicked(i) {
    const modal = await this.modalCtrl.create({
      component: DisclosureDetailComponent,
      componentProps: { data: i}
    });
    modal.present();
  }

  loadData(event) {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    this.updateList();
  }

  updateList() {
    this.subs = this.aix.getDisclosures(this.secCode, this.page * this.perPage, this.perPage).subscribe(next => {
      this.onRecieved(next);
    });
  }


  onRecieved(next) {
    this.infiniteScroll.complete();
    if (next && next['length'] && next['length'] > 0) {
      this.data = this.data.concat(next);
      this.page++;
    }
  }

}
