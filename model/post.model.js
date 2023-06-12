
  const mongoose = require("mongoose")


// schema
const postSchema = mongoose.Schema({
  "title":{type:String, required:true},
  "body":{type:String, required:true},
  "author":{type:String, required:true},
  "authorID":{type :String,required:true},
  "device":{type:String, required:true},
  "no_of_comments":{type:Number, required:true}
},{
    versionKey:false
})
// model

const PostModel = mongoose.model("post",postSchema)

module.exports = {
  PostModel
}