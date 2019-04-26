const ModelSercice = require('./model-service-base');

module.exports = class SubjectsService extends ModelService {

    constructor(){
        super(require('../models/subject'));
    }
}
