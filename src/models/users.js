const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {type: String, required: true},
    lastname : {type: String, Require:true},
    age : {type: String, Require:true},
    password : {type: String, Require:true},
});

module.exports = mongoose.model('User', UserSchema);