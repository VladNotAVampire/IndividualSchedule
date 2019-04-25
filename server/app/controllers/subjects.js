const koa = require('koa');
const subjectsService = require('../services/subjects');

/**
 * @param {koa.Context} ctx 
 * @swagger
 * /api/subjects/:
 *  get:
 *      tags:
 *          -subjects
 */
exports.get = async ctx => {
    const subjext = await subjectsService.get(ctx.params.id);
    ctx.body = subjext;
}

/**
 * @param {koa.Context} ctx 
 */
exports.post = async ctx => {
    const newSubject = await subjectsService.create(ctx.request.body);
    ctx.body = newSubject;
}

/**
 * @param {koa.Context} ctx 
 */
exports.patch = async ctx => {
    const newSubject = await subjectsService.update(ctx.params.id, ctx.request.body);
    ctx.body = newSubject;
}

/**
 * @param {koa.Context} ctx 
 */
exports.delete = async ctx => {
    const subject = await subjectsService.delete(ctx.params.id);
    ctx,body = subject;
}