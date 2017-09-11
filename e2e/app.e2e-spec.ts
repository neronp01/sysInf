import { SysInfPage } from './app.po';

describe('sys-inf App', () => {
  let page: SysInfPage;

  beforeEach(() => {
    page = new SysInfPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
