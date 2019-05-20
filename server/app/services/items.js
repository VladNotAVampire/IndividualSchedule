const ModelService = require('./model-service-base');

module.exports = class ItemsService extends ModelService{

    constructor(){
        super(require('../models/item'));
    }

    async getBySubjectId(subjectId) {
        return this.Model.find({ _subjectId: subjectId }).exec();
    }
}