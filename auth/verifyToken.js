import Jwt  from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js"
import User from "../models/UserSchema.js"
import { decode } from "punycode";


export const authenTicate=async(req,res,next)=>{
    //get token from header
    const authToken=req.headers.authorization;
      //check token is exists
      if(!authToken || !authToken.startsWith("Bearer"))
      {
        return res.status(401).json({success:false,message:"No token,authorization denied!"})
      }
      try{
        // console.log(authToken);
        const Token=authToken.split(' ')[1]
        // console.log()
        // verify token
         const decoded=Jwt.verify(Token,process.env.JWT_SECRET_KEY)
        req.userId=decoded.id;
        req.role=decoded.role
        next();//must be call the next function
      }
      catch(err)
      {
        if(err.name=='TokenExpiredError')
        {
          return res.status(401).json({message:'Token is expired'})
        }
        return res.status(401).json({success:false,message:"Invalid token"})
      }

}

export const restrict=roles=> async(req,res,next)=>{
const userId=req.userId
let user;
const patient=await User.findById(userId)
const doctor=await User.findById(userId)
if(patient)
{
  user=patient
}
if(doctor)
{
  user=doctor
}
if(!roles.includes(user.role))
{
   return res.status(401).json({success:false,message:"You are not authorized"})
}
next();
}
