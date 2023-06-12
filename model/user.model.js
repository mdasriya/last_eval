const mongoose = require("mongoose")
// schema
const userSchema = mongoose.Schema({
  "name":{type:String, required:true},
  "email":{type:String, required:true},
  "password":{type:String, required:true},
  "city":{type:String, required:true},
  "age":{type:Number, required:true},
  "is_married":{type:Boolean, required:true},

},{
    versionKey:false
})
// model

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}