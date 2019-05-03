import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AixService} from '../../../services/aix.service';

@Component({
  selector: 'app-disclosure-detail',
  templateUrl: './disclosure-detail.component.html',
  styleUrls: ['./disclosure-detail.component.scss'],
})
export class DisclosureDetailComponent implements OnInit {

  @Input() data: any;

  attachments;

  constructor(private modalCtrl: ModalController, private aix: AixService) { }

  ngOnInit() {
    if (!this.data) {
      this.closeModal();
    }

    this.aix.getDiscAttachments(this.data['id']).subscribe(next => {
      this.attachments = next;
      console.log('attachments', next);
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
