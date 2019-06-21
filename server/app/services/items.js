const ModelService = require('./model-service-base');

module.exports = class ItemsService extends ModelService {

    constructor() {
        super(require('../models/item'));
    }

    async get(id){
        try{

            if (id === undefined)
            return await super.get();
            
            let item = await this.Model.findOne({_id: id}).populate("_subjectId").populate("_userId").exec();
            item = item.toObject({getters: true});
            item.subject = item._subjectId;
            item.user = item._userId;
            item._subjectId = item.subject._id;
            item._userId = item.user._id;
            return item;
        }
        catch(error){
            throw error;
        }
    }

    async getBySubjectId(subjectId) {
        return this.Model.find({ _subjectId: subjectId, type: { $ne: "Completed task" } }).exec();
    }

    async getByUserId(userId) {
        return this.Model.find({ _userId: userId }).exec();
    }

    async getCompletedOfInstructor(instructorId) {
        try {

            const query = this.Model.aggregate([
                {
                    $match: {
                        _userId: instructorId,
                        type: { $ne: ["Completed task", "Lection"] }
                    }
                },
                {
                    $lookup: {
                        from: "items",
                        localField: "_id",
                        foreignField: "_targetId",
                        as: "targetedItems"
                    }
                },
                { $unwind: "$targetedItems" },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'targetedItems._userId',
                        foreignField: '_id',
                        as: 'targetedItems.user'
                    }
                },
                { $unwind: "$targetedItems.user" },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        type: { $first: "$type" },
                        targetedItems: {
                            $push: "$targetedItems"
                        }
                    }
                }
            ]);

            return query.exec();
        }
        catch (error) {
            return { error };
        }
    }
}