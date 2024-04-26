import { request } from '@playwright/test';
import { Urls } from 'data/urls';

export class DatabricksService {
  private urls: Urls;

  constructor() {
    this.urls = new Urls();
  }

  async runContactsJob() {
    console.log('Running job for Contacts in Databricks');
    const context = await request.newContext({
      baseURL: this.urls.DATABRICKS.BASE,
      extraHTTPHeaders: {
        Authorization: `Bearer ${process.env.DATABRICKS_TOKEN}`,
      },
    });

    await context.post('', {
      data: {
        job_id: 426098165027867,
      },
    });
  }

  async runBuildingRulesJob() {
    console.log('Running job for Building Rules in Databricks');
    const context = await request.newContext({
      baseURL: this.urls.DATABRICKS.BASE,
      extraHTTPHeaders: {
        Authorization: `Bearer ${process.env.DATABRICKS_TOKEN}`,
      },
    });

    await context.post('', {
      data: {
        job_id: 894359393369509,
      },
    });
  }
}
