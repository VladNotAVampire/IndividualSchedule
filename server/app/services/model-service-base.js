const mongoose = require('mongoose');

class ModelServiceBase {
    /**
     * 
     * @param {mongoose.Model} modelType 
     */
    constructor(modelType) {
        this.Model = modelType;

        let getAll = { a: "g" };
    }

    _getAll() {
        return this.Model.find().exec();
    }

    /**
     * 
     * @param {mongoose.Types.ObjectId | String} id
     * @returns {this.Model} 
     */
    _getOne(id) {
        return this.Model.findById(id).exec();
    }

    _throwIfModelNonObject(model) {
        if (!model)
            throw new Error("Model required");

        if (typeof (model) !== "object")
            throw new Error(`Object expected, got ${typeof (model)}`);
    }

    /**
     * 
     * @param {mongoose.Types.ObjectId | String} id 
     */
    async get(id) {
        try {
            return await (id ? this._getOne(id) : this._getAll());
        } catch (err) {
            console.error(err);
            return { error: err };
        }
    }

    async create(model) {
        try {
            this._throwIfModelNonObject(model);

            const instance = new this.Model({
                _id: new mongoose.Types.ObjectId(),
                ...model
            });

            return await this.Model.create(instance);
        } catch (err) {
            return { error: err };
        }
    }

    /**
     * @param {mongoose.Types.ObjectId | String} id 
     * @returns {mongoose.Model} */
    async update(id, model) {
        try {
            this._throwIfModelNonObject(model);

            return await this.Model.findByIdAndUpdate(id, { $set: model }, { new: true }).exec();
        } catch (err) {
            return { error: err };
        }
    }

    /**
     * @param {mongoose.Types.ObjectId | String} id 
     * @returns {mongoose.Model} 
     */
    async delete(id) {
        try {
            return await this.Model.findByIdAndDelete(id).exec();
        } catch (err) {
            return { error: err }
        }
    }
}

module.exports = ModelServiceBase;