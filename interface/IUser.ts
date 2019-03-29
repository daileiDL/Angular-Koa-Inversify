import * as Model from '../model/User';

export interface IUser {
    getUser(id: string): Model.User;
}