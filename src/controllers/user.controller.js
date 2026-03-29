import multer from "multer";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const registerUser=asyncHandler(async(req,res,next)=>{

  const {password,email,fullname,username}=req.body;

  const fieldEmpty=[password,username,email,fullname].some(field=>field==="");

  if(fieldEmpty){
    throw new ApiError(400,"fields should not be empty")
  }

  const existedUser=await User.find({
    $or:[
      {username},
      {email}
    ]
  })
console.log(existedUser);


  if((await existedUser).length!==0){
    throw new ApiError(409,"user already exist")
  }


const avatar=req.files?.avatar[0]?.path;
const coverImage=req.files?.coverImage[0]?.path;


 if(!avatar){
  throw new ApiError(400,"avatar is required!");
 }


 const avatarOBJ=await uploadOnCloudinary(avatar);
 const coverImageOBJ=await uploadOnCloudinary(coverImage);



 const userobj=new User({
    username,
    fullname,
    password,
    email,
    avatar:avatarOBJ.url,
    coverImage:coverImageOBJ?.url || "",

  })

  const savedUser=await userobj.save();

    const finalUser=await User.findById(savedUser._id).select(
      "-password -refreshToken"
    )
  console.log(finalUser);
  

   const response= new ApiResponse(200,finalUser);

   console.log(response);
   res.send(response)
  //  res.status(200).json({
  //   messgae:"ok"
  //  })
 




//THIS IS ANOTHER USER REGISTRATION IMPLEMENTATION DONE BY ME -->    ---------------------------------------

// const filesarray=Object.values(req.files).flat();


//    const promisesArray=filesarray.map(a=>{

//     return uploadOnCloudinary(a.path);

//    })

//   const getFinalarray=async(promisesArray)=>{
//     const finalarray=await Promise.all(promisesArray)
//     return finalarray;
//   }

//    function createANDSaveUser(arr){
//    const userobj=new User({
//     username,
//     fullname,
//     password,
//     email,
//     avatar:arr[0].url,
//     coverImage:arr[1].url,

//   })

//   userobj.save().then(res=>console.log(res));

//   }

  
//   getFinalarray(promisesArray)
//   .then(res=>{
    
//     createANDSaveUser(res);
    

//   })


// -------------------------------------------------------------------------------------------------------------
  

   
})











