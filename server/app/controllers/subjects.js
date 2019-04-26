const koa = require('koa');
const SubjectsService = require('../services/subjects');
const action = require('../action');
const roles = require('../constants/roles');
const subjectsService = new SubjectsService();

/**
 * @param {koa.Context} ctx 
 * @swagger
 * /api/subjects/{id}:
 *  get:
 *      tags:
 *      - subjects
 *      operationId: get
 *      parameters:
 *      - name: id
 *        type: string
 *        in: path
 *        required: false
 *      responses:
 *          "200":
 *              description: Success
 */
exports.get = async ctx => {
    const data = await subjectsService.get(ctx.params.id);

    if (!data) {
        ctx.body = {
            status: 404,
            message: "NotFound",
            data: null
        };
        return;
    }

    ctx.body = data;
}

/**
 * @param {koa.Context} ctx 
 * @swagger
 * /api/subjects/:
 *      post:
 *       tags:
 *       - subjects
 *       operationId: post
 *       parameters:
 *           - name: subject
 *             in: body
 *             required: true
 *       responses:
 *           "200":
 *               description: Success
 */
exports.post = action({ 
    authorization: { roles: [roles.STUDENT, roles.HEAD_OF_THE_DEPARTMENT] },
    bodyRequired: true 
},
    async ctx => {
        const newSubject = await subjectsService.create(ctx.request.body);
        ctx.body = newSubject;
    });

/**
 * @param {koa.Context} ctx 
 * @swagger
 * /api/subjects/{id}:
 *  patch:
 *      tags:
 *      - subjects
 *      operationId: patch
 *      parameters:
 *      - name: subject
 *        in: body
 *        required: true
 *      - name: id
 *        in: path
 *        type: String
 *        required: true
 *      responses:
 *          "200":
 *              description: Success
 */
exports.patch = action({ 
    authorization: { roles: [roles.STUDENT, roles.HEAD_OF_THE_DEPARTMENT] },
    bodyRequired: true 
},
    async ctx => {
        const newSubject = await subjectsService.update(ctx.params.id, ctx.request.body);
        ctx.body = newSubject;
    });

/**
 * @param {koa.Context} ctx 
 * @swagger
 * /api/subjects/{id}:
 *  delete:
 *      tags:
 *      - subjects
 *      operationId: patch
 *      parameters:
 *      - name: id
 *        type: string
 *        in: path
 *        required: true
 *      responses:
 *          "200":
 *              description: Success
 */
exports.delete = action({ authorization: { roles: [roles.STUDENT, roles.HEAD_OF_THE_DEPARTMENT] } },
    async ctx => {
        const subject = await subjectsService.delete(ctx.params.id);
        ctx, body = subject;
    });