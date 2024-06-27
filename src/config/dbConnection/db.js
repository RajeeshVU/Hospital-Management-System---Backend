import mongoose from "mongoose"
import environments from "../environments/environments.js"

export const db=mongoose.connect(environments.mongoUrl).then(()=>{
    console.log('connected to mongo db')
  }).catch((error)=>
    {
      console.log(error.message)
    })
  