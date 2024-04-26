export interface IPixlithPages {
    pixLoginPage: PixLoginPage;
}

export interface IAdminPages extends ICommonPages {
    pix: IPixPages;
}

export class Admin extends Base {
  pages: IAdminPages;
  data: IAdminData;

  constructor() {
    super();
  }

  async init() {
    this.pages.pix = {
      pixLoginPage: new PixLoginPage(this.browserEntity.page),
    };
  }
}
  