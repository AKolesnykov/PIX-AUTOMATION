import { Page } from 'playwright-core';
import { PixSteps } from './surety/surety.steps.master';


export class Steps {
  pixSteps: PixSteps;


  constructor(page: Page) {
    this.pixSteps = new PixSteps(page);
  }
}
