const ModelService = require('./model-service-base');

module.exports = class ItemsService extends ModelService {

    constructor() {
        super(require('../models/item'));
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
                        type: { $ne: "Completed task" } 
                    }
                },
                {
                    $lookup: {  
                        from: "items",
                        localField: "_id",
                        foreignField: "_targetId",
                        as: "targetedTasks"
                    }
                }
            ]);

            return query.exec();
        }
        catch(error){
            return { error };
        }
    }
}