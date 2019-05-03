import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-ticker',
  templateUrl: './stock-ticker.component.html',
  styleUrls: ['./stock-ticker.component.scss'],
})
export class StockTickerComponent implements OnInit, OnDestroy {

  @ViewChild('loopSlider') slider: IonSlides;

  // tslint:disable-next-line
  @Input('data') set setData(data) {
    this.data = data;
    this.slider.update();
  }

  data: any;

  slideOpts;

  constructor(private platform: Platform) {
  }

  private ionSlideTouchEnd: Subscription;

  ngOnInit() {
    this.ionSlideTouchEnd = this.slider.ionSlideTouchEnd.subscribe(() => {
      this.slider.startAutoplay();
    });

    this.slideOpts = {
      spaceBetween: -100,
      loop: 'true',
      autoplay: {
        delay: 0,
      },
      speed: 3500,
      freeMode: true,
      freeModeMomentum: false,
      reverseDirection: true
    };
  }

  ngOnDestroy(): void {
    if (this.ionSlideTouchEnd) {
      this.ionSlideTouchEnd.unsubscribe();
    }
  }
}
