var jwt = require('jsonwebtoken');
const {blacklist} = require("../blacklist")

 const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
      if(blacklist.includes(token)){
         res.json({msg:"Please login again!!"})
      }
      try {
         let decoded = jwt.verify(token, 'masai'); 
         if(decoded){
        req.body.authorID = decoded.authorID;
        req.body.author = decoded.author
            next();
         }else{
         res.json({msg:"Token not recognised"})
         }
      } catch (error) {
         res.json({err:error.message})
      }
    }else{
      res.json({msg:"Login First"})
    }   
 }

 module.exports = {
    auth
 }