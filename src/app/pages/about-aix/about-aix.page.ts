import { Component, OnInit } from '@angular/core';
import { WebAdminService } from '../../services/web-admin.service';
import { LocalizationService } from '../../localization.service';
import { LocalizedPage } from '../LocalizedPage';

@Component({
  selector: 'app-about-aix',
  templateUrl: './about-aix.page.html',
  styleUrls: ['./about-aix.page.scss'],
})
export class AboutAixPage extends LocalizedPage implements OnInit {

  // noinspection JSUnusedGlobalSymbols
  toLocalize = [{variable: 'pageTitle', key: 'about_aix__title'}];

  pageTitle: string;

  title: string;
  text: string;

  constructor(private wa: WebAdminService, public localization: LocalizationService) {
    super(localization);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initContent();
  }

  initContent() {
    this.wa.getAboutUs().subscribe(data => {
      if (data) {
        this.title = data.title;
        this.text = data.text;
      }
    });
  }

}
