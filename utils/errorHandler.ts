const errorHandler = {
    error(app, logger) {

        //对整个node进程做错误兜底
        process.on("uncaughtException", function (error) {
            logger.error(error);
            console.log(error);
        });
        process.on("unhandledRejection", function (error) {
            logger.error(error);
            console.log(error);
        });

        //对koa应用做错误兜底
        app.on("error", function (error, ctx) {
            logger.error(error);
            ctx.response.status = error.statusCode || error.status || 500;
            ctx.response.body = {
                message: error.message
            };
        });

        //捕获处理一般的500和404错误
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                //记录错误日志
                logger.error(error);
                ctx.status = error.statusCode || error.status || 500;
                ctx.body = {
                    message: error.message
                };
            }

            if (ctx.status !== 404) {
                return;
            }
            //防止百度降权，不承认网站404，强行设置为200
            ctx.status = 200;
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
        });
    }
};

export default errorHandler;