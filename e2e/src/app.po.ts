import { browser, by, element } from 'protractor';

export class AppPage {
  // noinspection JSMethodCanBeStatic
  navigateTo() {
    return browser.get('/');
  }

  // noinspection JSMethodCanBeStatic
  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
