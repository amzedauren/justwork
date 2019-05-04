import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'market-data', pathMatch: 'full' },
  { path: 'market-data', loadChildren: './pages/market-data/market-data.module#MarketDataPageModule' },
  { path: 'notices', loadChildren: './pages/news/news.module#NewsPageModule' },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },
  { path: 'my-trades', loadChildren: './pages/my-trades/my-trades.module#MyTradesPageModule' },
  { path: 'second-auth-code', loadChildren: './pages/second-auth-code/second-auth-code.module#SecondAuthCodePageModule' },

  { path: 'auth', loadChildren: './pages/registration/registration.module#RegistrationPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'language', loadChildren: './pages/change-language/change-language.module#ChangeLanguagePageModule' },
  { path: 'about-aix', loadChildren: './pages/about-aix/about-aix.module#AboutAixPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'contact-us', loadChildren: './pages/contact-us/contact-us.module#ContactUsPageModule' },

  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },

  { path: 'trade-detail', loadChildren: './pages/trade-detail/trade-detail.module#TradeDetailPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'qr-scanner', loadChildren: './pages/qr-scanner/qr-scanner.module#QrScannerPageModule' },

  { path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
