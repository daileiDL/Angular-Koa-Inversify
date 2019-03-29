import * as fetch from 'node-fetch';
import config from '../config';
import { provide, TYPES } from '../ioc/ioc';

@provide(TYPES.SafeRequest)
class SafeRequest {

    public baseUrl: string;

    constructor() {
        this.baseUrl = config.baseUrl;
    }

    public fetch(url: string, options: any): Promise<any> {
        let result = {
            code: 0,
            messege: '',
            data: {},
            error: {},
        };

        let req;
        if (options) {
            req = fetch(this.baseUrl + url, {
                method: options.method,
                body: options.params
            });
        } else {
            req = fetch(this.baseUrl + url);
        }

        return new Promise((resolve, reject) => {
            req.then(res => res.json()).then(json => {
                result.data = json;
                resolve(result);
            }).catch(error => {
                result.code = 1;
                result.messege = "请求服务数据出错";
                result.error = error;
                reject(result);
            })
        })
    }

}