export interface IApiMaster{
    petstore: IPetStoreApi;
    fakeRestApi: IFakeRestApi;
}

export interface IPetStoreApi{
    petApi: PetApi;
    storeApi: StoreApi;
    user: UserApi;
}

export interface IFakeRestApi{
    activities: ActivitiesApi;
    authors: AuthorsApi;
    books: BooksApi;
}

export class ApiMaster extends Base {
    apis: IApiMaster;

    constructor(){
        super();
    }

    async init(){
        this.apis = {
            petstore:{
                petApi: new PetApi()
            }
        }
    }
}