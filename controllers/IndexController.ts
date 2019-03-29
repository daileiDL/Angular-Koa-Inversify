import {
    controller,
    interfaces,
    httpGet,
    Router,
    inject,
    TAGS,
    provideThrowable,
    TYPE,
} from '../ioc/ioc';
import * as qs from 'querystring';

@controller('/')
@provideThrowable(TYPE.Controller, "IndexController")
class IndexController implements interfaces.Controller {

    constructor(
        @inject(TAGS.IndexService) private indexService: any,
    ) { }

    @httpGet('/')
    private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        let user = this.indexService.getUser(1);
        await ctx.render('index/index', { user });
        // ctx.body = user;
    }

    @httpGet('book')
    private async book(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        var queryobj = {};
        for (const k of Object.keys(ctx.query)) {
            if (ctx.query[k]) {
                queryobj[k] = ctx.query[k].trim();
            }
        }

        var querystring = qs.stringify(queryobj);

        let res = await this.indexService.getBook('/restfulbooks?' + querystring);
        ctx.body = res;
    }

    @httpGet('api')
    private async api(ctx: Router.IRouterContext, next: () => Promise<any>) {
        
        ctx.body = '我是api';
    }

}