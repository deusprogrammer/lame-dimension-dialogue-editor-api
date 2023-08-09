const mongoose = require('mongoose');
import bcrypt from 'bcrypt';

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
    },
    password: {
        type: String,
        required: 'Question is required',
    },
    roles: {
        type: [String],
    },
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(JSON.stringify(this));
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model('users', userSchema);
