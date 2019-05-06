import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageKeys } from '../../../../storage-keys';
import PatternLock from 'patternlock';

@Component({
  selector: 'app-step4',
  templateUrl: './pattern-step.component.html',
  styleUrls: ['./pattern-step.component.scss'],
})
export class PatternStep implements OnInit {

  constructor(private storage: Storage) { }

  patternStr: string;

  ngOnInit() {
    const lock: PatternLock = new PatternLock('#pattern-container', {
      onDraw: (pattern) => {
        this.patternStr = pattern;
      }
    });
  }

  setPatternValue(value) {
    this.storage.set(StorageKeys.SECURITY_PATTERN_VALUE, value);
  }

  save() {
    this.setPatternValue(this.patternStr);
    this.storage.set(StorageKeys.SECURITY_USE_PATTERN, true);
  }

  skip() {
    this.storage.set(StorageKeys.SECURITY_USE_PATTERN, false);
  }

}
