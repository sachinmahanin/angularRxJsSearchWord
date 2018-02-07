import { K15TPage } from './app.po';

describe('k15-t App', function() {
  let page: K15TPage;

  beforeEach(() => {
    page = new K15TPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
