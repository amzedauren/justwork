import { Component, OnInit } from '@angular/core';
import { LocalizedPage } from '../../../pages/LocalizedPage';
import { LocalizationService } from '../../../localization.service';

@Component({
  selector: 'aix-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends LocalizedPage implements OnInit {

  // noinspection JSUnusedGlobalSymbols
  toLocalize: { variable: string; key: string }[] = [
    { variable: 'footer_text', key: 'aix-footer' }
  ];

  footer_text: string;

  constructor(public localization: LocalizationService) {
    super(localization);
  }

  ngOnInit() {
    super.ngOnInit();
  }


}
