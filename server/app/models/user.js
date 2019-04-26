const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const salt = require('../authconfig.json').salt;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: "Email required",
        unique: "Specified email already in use"
    },
    role: {
        type: String,
        enum: ["student", "instructor", "headOfTheDepartment"],
        required: true
    },
    hashedPassword: String,
    firstName: String,
    middleName: String,
    lastName: String,
    phone: String
}, {
    timestamps: true
});

userSchema.virtual('password')
    .set(function (password) {
      this._plainPassword = password;
      if (password) {
        this.hashedPassword = crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1');
      } else {
        this.hashedPassword = undefined;
      }
    })
    .get(function () {
      return this._plainPassword;
    });

userSchema.methods.checkPassword = function (password) {
    if (!password || !this.hashedPassword) return false;

    return crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1') == this.hashedPassword;
};

const User = mongoose.model('User', userSchema);
module.exports = User;