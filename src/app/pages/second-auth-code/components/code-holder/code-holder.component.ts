import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StorageKeyEnum, StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-code-holder',
  templateUrl: './code-holder.component.html',
  styleUrls: ['./code-holder.component.scss'],
})
export class CodeHolderComponent implements OnInit, OnDestroy {

  @Input() codeChange$: BehaviorSubject<{ code: string, restart?: boolean }>;

  @Output() refresh = new EventEmitter<void>();

  code: string;
  countdownSecToRefresh = '0';

  private MAX_COUNTDOWN = 60;
  private code$: Subscription;
  private intervalId: number;

  constructor(private storage: StorageService) {
  }

  ngOnInit() {
    this.code$ = this.codeChange$.subscribe((obj: { code: string, restart?: boolean }) => {
      if (!!obj && !!obj.code) {
        this.code = obj.code.toString();
        !!obj.restart ? this.restartCountdown() : this.startCountdown();
      }
    });
  }

  ngOnDestroy(): void {
    this.code$.unsubscribe();
    window.clearInterval(this.intervalId);
  }

  private restartCountdown() {
    this.storage.set(StorageKeyEnum.SECOND_CODE_COUNTDOWN_START_DATE, new Date());
    this.startCountdown();
  }

  private startCountdown() {
    this.updateCountDown();
    this.intervalId = window.setInterval(() => {
      this.updateCountDown();
    }, 1000);
  }

  private updateCountDown() {
    const countDownStartDate: Date = new Date(this.storage.get(StorageKeyEnum.SECOND_CODE_COUNTDOWN_START_DATE));
    const countdownSecToRefresh = this.MAX_COUNTDOWN - (new Date().getTime() - countDownStartDate.getTime()) / 1000;
    if (countdownSecToRefresh < 0) {
      window.clearInterval(this.intervalId);
      this.refresh.emit();
    } else {
      this.countdownSecToRefresh = countdownSecToRefresh.toFixed(0);
    }
  }

  onRefresh() {
    this.refresh.emit();
  }
}
