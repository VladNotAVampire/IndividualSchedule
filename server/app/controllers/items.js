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
        
        ctx.attachment(item.originalFileName);
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
        _targetId: ctx.request.body.targetItem,
        type: ctx.request.body.type,
        fileType: file.type,
        name: ctx.request.body.name,
        fileName: fileName,
        originalFileName: file.name
    };

    ctx.body = await items.create(item);
});

exports.setMark = action({
    authorization: [roles.INSTRUCTOR, roles.HEAD_OF_THE_DEPARTMENT],
    bodyRequired: true
}, async ctx => {
    const mark =  ctx.request.body.mark;
    const itemId = ctx.params.id;

    if (!itemId){
        ctx.res.badRequest({message: "itemId is required"});
        return;
    }

    if (!mark || mark < 2 || mark > 5){
        ctx.res.badRequest({message: "mark is required and must be lower than 5 and greater then 2"});
        return;
    }

    const item = await items.get(itemId);

    if (!item){
        ctx.res.notFound();
        return;
    }

    if (item.type !== "Completed task"){
        ctx.res.badRequest({message: "cannot set mark to " + item.type});
    }

    ctx.body = await items.update(item._id, {mark, comment: ctx.request.body.comment});
});

exports.getOwnItems = action({
    authorization: roles.all,
}, async ctx => {
    ctx.body = await items.getByUserId(ctx.user._id);
});

exports.getCompletedTasks = action({
    authorization: [roles.INSTRUCTOR, roles.HEAD_OF_THE_DEPARTMENT]
}, async ctx => {
    ctx.body = await items.getCompletedOfInstructor(ctx.user._id);
});