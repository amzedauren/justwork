import { Component, Input, OnInit } from '@angular/core';
import { Share } from '../../../../models/Share';
import { Broker } from '../../../../models/Broker';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {

  @Input() broker: Broker;

  shares: Share[] = [
    {
      'Instrument Code': 'SUBX',
      Total: 100,
      Free: 20,
      Locked: 60,
      Reserved: 20,
      Value: 41
    },
    {
      'Instrument Code': 'SUBX.Y',
      Total: 1200,
      Free: 600,
      Locked: 200,
      Reserved: 400,
      Value: 41
    }
  ];
  expanded = false;

  secCodeList = '';

  constructor() {
  }

  ngOnInit() {
    this.shares.forEach(s => this.secCodeList += `, ${s['Instrument Code']}`);
  }

  onClick() {
    this.expanded = !this.expanded;
  }
}
