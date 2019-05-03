import { Component, OnInit } from '@angular/core';
import {LocalizationService} from '../../localization.service';
import {LocalizedPage} from '../LocalizedPage';
import {WebAdminService} from '../../services/web-admin.service';
import {Help} from '../../models/help';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage extends LocalizedPage implements OnInit {

  toLocalize: { variable: string; key: string }[] = [
    {variable: 'help__title', key: 'help__title'},
  ];

  help__title;

  helpList: Help[];

  constructor(private wa: WebAdminService,
      public localization: LocalizationService) {super(localization); }

  ngOnInit() {
    super.ngOnInit();
    this.loadList();
  }

  loadList() {
    this.wa.getHelpList(this.localization.languageCode).subscribe(data => {
      this.helpList = data;
    });
  }

  loadHelpMessage(index: number) {

    if (this.helpList[index].text) {
      this.helpList[index].text = '';
    } else {
      this.wa.getHelMessage(this.helpList[index].helperId, this.localization.languageCode).subscribe(data => {
        this.helpList[index].text = data.text;
      });
    }
  }

}
