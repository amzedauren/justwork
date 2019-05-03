import { Component, OnInit } from '@angular/core';
import { CsdService } from '../../services/csd.service';
import { BehaviorSubject } from 'rxjs';
import { StorageKeyEnum, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-second-auth-code',
  templateUrl: './second-auth-code.page.html',
  styleUrls: ['./second-auth-code.page.scss'],
})
export class SecondAuthCodePage implements OnInit {

  private readonly codeChange: BehaviorSubject<{ code: string, restart?: boolean }> = new BehaviorSubject(null);

  constructor(private csdService: CsdService,
              private storage: StorageService) {
  }

  ngOnInit() {
    const code = this.storage.get(StorageKeyEnum.SECOND_CODE);
    if (!!code) {
      this.codeChange.next({ code: code });
    } else {
      this.generate();
    }
  }

  private generate() {
    this.csdService.generate()
    .then(code => {
      this.storage.set(StorageKeyEnum.SECOND_CODE, code);
      this.codeChange.next({ code: code, restart: true });
    });
  }

  onRefresh() {
    this.generate();
  }
}
