import supertest, { SuperAgentTest } from 'supertest';
import { Urls } from '../data/urls';

export interface ApiResponse {
    requestMethod: string;
    requestUrl: string;
    requestData: any;
    requestHeaders: any;
    responseStatus: number;
    responseBody: any;
    responseHeaders: any;
  }



  export class BaseApiRequest {
    protected urls: Urls;
    protected agent: SuperAgentTest;
  
    constructor() {
      this.urls = new Urls();
    }
  
    protected setBasicAuthRequest = (baseUrl: string, basicAuthToken: string): void => {
      this.agent = supertest.agent(baseUrl);
      this.agent.set({ Authorization: `Basic ${basicAuthToken}` });
    };
  
    protected setBearerTokenRequest = (baseUrl: string, bearerToken: string): void => {
      this.agent = supertest.agent(baseUrl);
      this.agent.set({ Authorization: `Bearer ${bearerToken}` });
    };
  
    protected setPlainAuthRequest = (baseUrl: string, authToken: string): void => {
      this.agent = supertest.agent(baseUrl);
      this.agent.set({ Authorization: authToken });
    };
  
    protected setRequestNoAuth = (baseUrl: string): void => {
      this.agent = supertest.agent(baseUrl);
    };
  
    protected constructApiResponse = (apiResponse: any): ApiResponse => {
      const reqData = JSON.parse(JSON.stringify(apiResponse)).req;
      return {
        requestMethod: JSON.stringify(reqData.method),
        requestUrl: JSON.stringify(reqData.url),
        requestData: JSON.stringify(reqData.data),
        requestHeaders: JSON.stringify(reqData.headers),
        responseStatus: apiResponse.status,
        responseBody: apiResponse.body,
        responseHeaders: apiResponse.headers,
      };
    };
  
    isSchemaMatching = (schema: any, data: any) => {
      const ajv = new Ajv({ strict: false });
      console.log('Checking if schema matches the data...');
      const validate = ajv.compile(schema);
      const isValid = validate(data);
      if (!isValid) {
        console.log(`Schema mismatch : ${JSON.stringify(validate.errors)}`);
      }
      return isValid;
    };
  
    protected getEqualityFilter = (searchKey: string, searchText: string): string => {
      return `${searchKey}||$eq||${searchText}`;
    };
  }
  