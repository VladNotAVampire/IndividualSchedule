const User = require('../models/user');
const Base = require('./model-service-base');

module.exports = class UsersService extends Base {
    constructor(){
        super(User);
    }

    async findByEmail(email){
        return await User.findOne({ email }).exec();
    }
}