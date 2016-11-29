import { Angular2102Page } from './app.po';

describe('angular2-102 App', function() {
  let page: Angular2102Page;

  beforeEach(() => {
    page = new Angular2102Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
