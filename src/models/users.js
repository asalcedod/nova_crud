const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    user_id: {type: String, required: true},
    name: {type: String, required: true},
    lastname : {type: String, Require: true},
    age : {type: Number, Require: true},
    password : {type: String, Require: true},
})

module.exports = mongoose.model('User', UserSchema)