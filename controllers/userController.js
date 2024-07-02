import User from "../models/UserSchema.js"
import Booking from "../models/BookingSchema.js"
import Doctor from "../models/DoctorSchema.js"
export const updateUser=async(req,res)=>{
    const id=req.params.id;
    try{
        const updateUser=await User.findByIdAndUpdate( id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"Successfully Updated!",data:updateUser});
    }
    catch(err)
    {
        res.status(500).json({success:false,message:"Failed to update!"});
    }
};
export const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try{
        const deleteUser=await User.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Success fully Deleted!"});
    }
    catch(err)
    {
        res.status(500).json({success:false,message:"Failed to delete!"});
    }
}
export const getsingleUser=async(req,res)=>{
    const id=req.params.id;
    try{
        const user=await User.findById(id).select("-password")
        res.status(200).json({success:true,message:"User found!",data:user});
    }
    catch(err)
    {
        res.status(404).json({success:false,message:"No user found!"});
    }
}
export const allUsers=async(req,res)=>{
    try{
        const users=await User.find({}).select("-password")
        res.status(200).json({success:true,message:"Users found!",data:users});
    }
    catch(err)
    {
        res.status(404).json({success:false,message:"Not found!"});
    }
}

export const getUserProfile=async(req,res)=>{
    const userId=req.userId
    try{
        const user=await User.findById(userId)
        if(!user)
        {
            return res.status(404).json({success:false,message:'User not found!'})
        }
        const {password,...rest}=user._doc
        return res.status(200).json({success:true,message:'Profile info getting!',data:{...rest}})
    }catch(err)
    {
        return res.status(500).json({success:false,message:'Something went wrong,Cannot get'})
    }
}

export const getMyAppointments=async(req,res)=>{
    const userId=req.userId
    console.log("hello")
    try{
        // step 1 -retrieve appointments from bookings for specific user
        const bookings= await Booking.find({user:req.userId})
        // step 2 -extract doctor ids from appointment bookings
        const doctorIds= await Booking.map(el=>el.doctor.id)
        // step 3 -retrieve doctor using doctor ids
        const doctors= await Doctor.find({user:req.userId})
        const user=await User.findById({_id:{$in:doctorIds}}).select('-password')
        return res.status(200).json({success:true,message:'Appointments are getting',data:doctors})
    }catch(err)
    {
        return res.status(500).json({success:false,message:'Something went wrong,Cannot get'})
    }
}

