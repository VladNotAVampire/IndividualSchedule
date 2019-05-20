const koa = require('koa');
const ItemsService = require('../services/items');
const action = require('../action');
const roles = require('../constants/roles');
const fs = require('fs');
const send = require('koa-send');
const path = require('path');
const filedirs = require('../filedirs');

const items = new ItemsService();

/**
 * @param {koa.Context} ctx
 */
exports.getById = async ctx =>{
    const id = ctx.params.id;
    ctx.body = await items.get(id);
};

exports.getBySubjectId = async ctx =>{
    const subjectId = ctx.params.subjectId;
    ctx.body = await items.getBySubjectId(subjectId);
};

/**
 * @param {koa.Context} ctx
 */
exports.getFile = async ctx => {
    try{

        const id = ctx.params.id;
        const item = await items.get(id);
        
        if (!item)
        return ctx.res.notFound();
        
        ctx.attachment(item.name);
        //const filePath = path.join(filedirs.filesDir, item.fileName);
        const filePath = "app/files/" + item.fileName;
        await send(ctx, filePath);
    }catch  (err){
        console.log(err);
        throw err;
    }
}
 
exports.post = action({
    authorization: [roles.STUDENT, roles.INSTRUCTOR],
    bodyRequired: true
}, async ctx => {
    if (!ctx.request.body.subjectId){
        ctx.res.badRequest({message: "subjectId required"});
        return;
    };

    const file = ctx.request.files.file;
    if (!file){
        ctx.res.badRequest({messagee: "file required"});
        return;
    }

    const reader = fs.createReadStream(file.path);
    const fileName = Math.random().toString() + file.name;
    const stream = fs.createWriteStream(path.join(filedirs.filesDir, fileName));
    reader.pipe(stream);

    const item = {
        _subjectId: ctx.request.body.subjectId,
        _userId: ctx.user._id || ctx.user.id,
        type: ctx.request.body.type,
        fileType: file.type,
        name: file.name,
        fileName: fileName
    };

    ctx.body = await items.create(item);
});