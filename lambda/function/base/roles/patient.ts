import { Base, ICommonPages } from '../base';
import { PixLoginPage } from '../../pages/pixlith/common/login.ml.page';

export interface IPatientPages extends ICommonPages {
  pix: IPixPatientPages;
}

export interface IPixPatientPages {
  pixLoginPage: PixLoginPage;
}


export class Patient extends Base {
  pages: IPatientPages;
  data: IPatientData;

  constructor() {
    super();
  }

  async init() {
    this.pages.pix = {
      pixLoginPage: new PixLoginPage(this.browserEntity.page),
    };
  }
}
