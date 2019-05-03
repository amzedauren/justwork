import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LocalizationService} from '../localization.service';

export abstract class LocalizedPage implements OnInit, OnDestroy {

  private subs: Subscription;
  abstract toLocalize: {variable: string; key: string}[] = [];

  constructor(public localization: LocalizationService) {
    this.subs = localization.translatesUpdatedSubject.subscribe(() => {
      this.localizePage();
    });
  }

  localizePage() {
    this.toLocalize.forEach(value => { this[value.variable] = this.localization.localString(value.key); });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.localizePage();
  }

}
