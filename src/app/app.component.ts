import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalizationService } from './localization.service';
import { SideMenuItem } from './models/SideMenuItem';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  marketSideMenuItems: SideMenuItem[] = [
    { url: '/market-data', icon: 'assets/icon/market-data.svg', title: 'Market Data' },
    { url: '/notices', icon: 'assets/icon/notices.svg', title: 'News and Market notices', hasBadge: true },
    { url: '/notifications', icon: 'assets/icon/notifications.svg', title: 'Notifications', hasBadge: true },
    { url: '/my-trades', icon: 'assets/icon/trades.svg', title: 'My trades' },
    { url: '/second-auth-code', icon: 'assets/icon/auth-code.svg', title: '2nd Authentification Code' },
  ] as SideMenuItem[];

  settingsSideMenuItems: SideMenuItem[] = [
    { url: '/auth', icon: 'assets/icon/profile_dark_blue.svg', title: 'Sign In / Sign Up', className: 'highlighted' },
    { url: '/profile', icon: 'assets/icon/profile.svg', title: 'Profile' },
    { url: '/language', icon: 'assets/icon/settings.svg', title: 'Language' },
    { url: '/about-aix', icon: 'assets/icon/about.svg', title: 'About AIX' },
    { url: '/help', icon: 'assets/icon/help.svg', title: 'Help' },
    { url: '/contact-us', icon: 'assets/icon/contact.svg', title: 'Contact us' },
  ] as SideMenuItem[];

  logoutSideMenuItems: SideMenuItem[] = [
    { url: '/login', icon: 'assets/icon/logout.svg', title: 'Log out' }
  ] as SideMenuItem[];

  selectedPath = '/market-data';

  constructor(
      private router: Router,
      private navController: NavController,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private localization: LocalizationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      await this.localization.init();

      this.router.events.subscribe((event: RouterEvent) => {
        this.selectedPath = event.url;
      });

      this.splashScreen.hide();
    });
  }

}
