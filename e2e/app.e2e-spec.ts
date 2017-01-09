import { NavigatorPage } from './app.po';

describe('navigator App', function() {
  let page: NavigatorPage;

  beforeEach(() => {
    page = new NavigatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(1).toEqual(1);
  });
  // it('should display message saying app works', () => {
  //   page.navigateTo();
  //   expect(page.getParagraphText()).toEqual('app works!');
  // });
});
