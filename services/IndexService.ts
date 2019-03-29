import { IUser } from '../interface/IUser';
import * as Model from '../model/User';
import { provide, inject, TAGS, TYPES } from '../ioc/ioc';

@provide(TAGS.IndexService)
export class IndexService implements IUser {

    constructor(
        @inject(TYPES.SafeRequest) private safeRequest: any,
    ) { }

    private userData: Array<Model.User> = [
        {
            email: 'aaaaa',
            name: '代磊',
        },
        {
            email: 'bbbbb',
            name: '赵云',
        },
    ]

    getUser(id: string): Model.User {
        return this.userData[id];
    }

    getBook(url: string, option?: any) {
        const data = this.safeRequest.fetch(url);
        return data;
    }

}