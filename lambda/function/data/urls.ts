export interface IPIXLITH_URLS {
    BASE: string;
    LOGIN: string;
    SIGNUP: string;
    getApplicationEditUrl: (applicationId: string) => string;
    getApplicationByApplicantSearchQuery: (query: string) => string;
    getBuildingEditUrlById: (buildingId: string) => string;
    getBuildingEditCredentialsUrlById: (buildingId: string) => string;
  }

  
  export class Urls {
    constructor() {
      this.currentEnvironment = this.getCurrentEnvironment();
      this.setAllUrls();
    }
  
    private environmentList = ['dev', 'test', 'production'];
    private currentEnvironment: string;
    private ENVIRONMENT: string;
    PIXLITH: Partial<IPIXLITH_URLS>;

  
    private getCurrentEnvironment = (): string => {
      if (process.env.ENVIRONMENT && this.environmentList.includes(process.env.ENVIRONMENT)) {
        return process.env.ENVIRONMENT;
      } else {
        throw new Error(`Environment is not setup. Value of ENVIRONMENT is ${process.env.ENVIRONMENT}`);
      }
    };
  
    private setAllUrls = () => {
      this.ENVIRONMENT = this.currentEnvironment === 'production' ? '' : `${this.currentEnvironment}.`;
      this.PIXLITH = {};
      this.PIXLITH.BASE = `https://${this.ENVIRONMENT}pix.com`;
      this.PIXLITH.LOGIN = `${this.PIXLITH.BASE}/login`;
      this.PIXLITH.getApplicationEditUrl = (applicationId: string) => {
        return `${this.PIXLITH.BASE}/admin/applications/${applicationId}/edit`;};
      }
  }
  