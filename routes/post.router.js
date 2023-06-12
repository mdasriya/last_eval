
 const express = require("express")
const {PostModel} = require("../model/post.model")
const {auth} = require("../middleware/auth")
var jwt = require('jsonwebtoken');
 const PostRouter = express.Router()
 
 PostRouter.post("/add",auth,async(req,res)=> {
   const data = req.body
   try {
      const book = new PostModel(data)
      await book.save()
      res.status(200).json({msg:"Post added", addedPost:data})
   } catch (error) {
    res.status(400).json({err:error.message})
   }
 })




PostRouter.get("/",auth, async (req, res) => {

  if (req.query.min || req.query.max) {
      let userID = req.body.userID
      console.log(userID)
      try {
          let users = await UserModel.find({ userID: userID })
          if (users.length > 0) {
              let allpost = await PostModel.find({ $and: [{ no_of_comments: { $gte: Number(req.query.max), $lte: Number(req.query.min) } }, { userID: userID }] })
              res.status(200).send({ "data": allpost })
          } else {
              res.status(400).send({ er: "Somethin went wrong" })
          }
      } catch (error) {
          res.status(400).send({ err: "Somethin went wrong" })
      }
  } else if (req.query.page) {
      let limit = 3
      let token = req.headers.authorization.split(" ")[1]
      let decoded = jwt.verify(token, 'masai');
      let page = Math.abs(Number(req.query.page))
      let skipdata = 0
      if (page > 1) {
          skipdata = (page - 1) * limit
      }
      try {


          let data = await PostModel.find({ userID: decoded.userID }).skip(skipdata).limit(limit)
          if (data.length > 0) {
              res.status(200).json({ data: data })
          } else {
              res.status(400).send({ err: "Not avilable" })
          }
      } catch (error) {
          res.status(400).send({ err: "something went wrong" })
      }
  } else if (req.query.device) {
      let device = req.query.device
      console.log(device)
      try {
          let data = await PostModel.find({ device: device })
          if (data.length > 0) {

              res.status(200).send({ "data": data })
          } else {
            res.status(400).json({ er: "Somethin went wrong" })
          }
      } catch (error) {
        res.status(400).json({ er: "Somethin went wrong" })
      }
  } else if (req.query.device1 && req.query.device2) {
      console.log(req.query.device1, req.query.device2)
      try {
          let allpost = await PostModel.find({ $or: [{ device: req.query.device1 }, { device: req.query.device2 }] })
          if (allpost.length > 0) {

              res.status(200).send({ "data": allpost })
          } else {
            res.status(400).json({ er: "Somethin went wrong" })
          }
      } catch (error) {
          res.status(400).json({ er: "Somethin went wrong" })
      }
  }


  else {
      let userID = req.query.userID

      try {
          let users = await userModel.find({ _id: userID })
          console.log(users)
          if (users.length > 0) {
              console.log(typeof userID, userID)
              let allpost = await postModel.find({ userID: userID })
              console.log(allpost)
              res.status(200).send({ "data": allpost })
          } else {
              res.status(400).send({ "er": "Somethin went wrong" })
          }
      } catch (error) {
          res.status(400).send({ "er": "Somethin went wrong2" })
      }
  }

})


PostRouter.patch("/update/:id",auth, async(req,res)=> {
const {id} = req.params;
const post = await PostModel.findOne({_id:id})
try {
  if(req.body.authorID!==post.authorID){
    res.status(200).json({msg:"you are mot authorized to do this action"})
  }else{
    await PostModel.findByIdAndUpdate({_id:id},req.body)
    res.status(200).json({msg:"Post has been updated"})
  }
} catch (error) {
  res.status(400).json({err:error.message})
  
}
})

PostRouter.delete("/delete/:id",auth, async(req,res)=> {
  const {id} = req.params;
const book = await PostModel.findOne({_id:id})

  try {
    if(req.body.authorID!==book.authorID){
      res.status(200).json({msg:"you are mot authorized to do this action"})
    }else{
      await PostModel.findByIdAndDelete({_id:id})
      res.status(200).json({msg:"Post has been deleted"})
    }
  } catch (error) {
    res.status(400).json({err:error.message})
  }
})
 module.exports = {
    PostRouter
 }


