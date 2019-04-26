const koa = require('koa');

/**@interface */
class ActionOptions {
    constructor() {
        this.authorization = { roles: [''] };
        this.bodyRequired = false;
    }
}

/**
 * @param {ActionOptions} options  
 */
module.exports = (options = {}, func) => {
    if (typeof (func) !== "function")
        throw new Error("Invalid function");
    /** @param {koa.Context} ctx */
    return async ctx => {
        if (options.authorization) {
            if (!ctx.user) {
                ctx.res.unauthorized();
                return;
            }

            if (options.bodyRequired && ! ctx.body){
                ctx.res.badRequest({ message: "Body required"});
                return;
            }

            await func(ctx);
        }
    }
}