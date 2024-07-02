import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js"


export const updateDoctor=async(req,res)=>{
    const id=req.params.id;
    try{
        const updateDoctor=await Doctor.findByIdAndUpdate( id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"Successfully Updated!",data:updateDoctor});
    }
    catch(err)
    {
        res.status(500).json({success:false,message:"Failed to update!"});
    }
};
export const deleteDoctor=async(req,res)=>{
    const id=req.params.id;
    try{
        const deleteDoctor=await Doctor.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Success fully Deleted!"});
    }
    catch(err)
    {
        res.status(500).json({success:false,message:"Failed to delete!"});
    }
}
export const getsingleDoctor=async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    try{
        const doctor=await Doctor.findById(id).populate("reviews").select("-password")
        res.status(200).json({success:true,message:"Doctor found!",data:doctor});
    }
    catch(err)
    {
        res.status(404).json({success:false,message:"No Doctor found!"});
    }
}
export const allDoctors=async(req,res)=>{
    // const query=req.query;
   
    try{
        const query=req.guery;
        console.log(query)
        let doctors;
        if(query)
        {
            doctors=await Doctor.find({isApproved:'approved',$or:[{name:{$regex:query,$options:"i"}},{specialization:{$regex:query,$options:"i"}}]}).select("-password");
        }
        else{
            doctors=await Doctor.find({isApproved:'approved'}).select("-password");
        }
        res.status(200).json({success:true,message:"Doctors found!",data:doctors});
    }
    catch(err)
    {
        res.status(404).json({success:false,message:"Not found!"});
    }
}


export const getDoctorProfile=async(req,res)=>{
    const doctorId=req.userId
    try{
        const doctor=await Doctor.findById(userId)
        if(!doctor)
        {
            return res.status(404).json({success:false,message:'Doctor not found!'})
        }
        const {password,...rest}=doctor._doc;
        const appointments=await Booking.find({doctor:doctorId})
        return res.status(200).json({success:true,message:'Profile info getting!',data:{...rest,appointments}})
    }catch(err)
    {
        return res.status(500).json({success:false,message:'Something went wrong,Cannot get'})
    }
}