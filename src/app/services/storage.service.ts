import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private cache: Map<StorageKeyEnum, any> = new Map();

  constructor() {
  }

  get(key: StorageKeyEnum) {
    let fromCache = this.cache.get(key);
    if (!!fromCache === false) {
      fromCache = JSON.parse(localStorage.getItem(key));
      this.cache.set(key, fromCache);
    }
    return fromCache;
  }

  set(key: StorageKeyEnum, value: any) {
    this.cache.set(key, value);
    localStorage.setItem(key, JSON.stringify(value));
  }

}

export enum StorageKeyEnum {
  SECOND_CODE_COUNTDOWN_START_DATE = 'SECOND_CODE_COUNTDOWN_START_DATE',
  SECOND_CODE = 'SECOND_CODE'
}
