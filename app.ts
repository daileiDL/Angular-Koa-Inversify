import { InversifyKoaServer } from 'inversify-koa-utils';
import { Container, buildProviderModule } from './ioc/ioc';
import errorHandler from './utils/errorHandler';
import config from './config';
import * as path from 'path';
import * as url from 'url';
import * as log4js from 'log4js';
import * as render from 'koa-art-template';
import * as serve from 'koa-static';
import * as koaBodyparser from 'koa-bodyparser';
import historyApiFallback from 'koa2-connect-history-api-fallback';

import * as IO from 'koa-socket';

import "reflect-metadata";
import './ioc/loader';

//ioc容器加载资源
const container = new Container();
container.load(buildProviderModule());

new InversifyKoaServer(container)
    .setConfig(app => {
        // handle fallback for HTML5 history API
        app.use(historyApiFallback({
            whiteList: ['/api']
        }));

        // 注册静态目录
        app.use(serve(config.STATIC_DIR));

        // 配置post的中间件
        app.use(koaBodyparser());

        // 注册模板引擎
        // render(app, {
        //     root: path.join(config.VIEWS_DIR),
        //     extname: '.html',
        //     debug: process.env.NODE_ENV !== 'production'
        // });
    })
    .setErrorConfig(app => {
        //容错，记录错误日志
        log4js.configure({
            appenders: {
                cheese: {
                    type: 'file',
                    filename: 'log/error.log'
                }
            },
            categories: {
                default: {
                    appenders: ['cheese'],
                    level: 'error'
                }
            }
        });
        const logger = log4js.getLogger();
        errorHandler.error(app, logger);
        
        const io = new IO();
        io.attach(app);
        app._io.on('connection', socket => {

            console.log('socket配置成功')

            //io.emit  广播
            //socket.emit  谁给我发的信息我回返回给谁

            //获取客户端建立连接的时候传入的值
            //console.log(socket.request.url);
            var roomid = url.parse(socket.request.url, true).query.roomid;   /*获取房间号/ 获取桌号*/

            console.log(roomid);

            socket.join(roomid);  /*加入房间/加入分组*/

            socket.on('addcart', function (data) {

                console.log(data)

                //广播给指定桌号的用户        对房间（分组）内的用户发送消息
                //io.to(roomid).emit('addCart','Server AddCart Ok'); //通知分组内的所有用户

                socket.broadcast.to(roomid).emit('addcart', 'Server AddCart Ok'); //通知分组内的用户不包括自己

            })
        })
    })
    .build()
    .listen(config.PORT, () => {
        console.log('🤔启动成功😁');
    });