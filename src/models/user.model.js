import mongoose ,{Schema,model} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const Userschema=new Schema({
  watchHistory:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"video",
  }
  ],
  username:{
    type:String,
    required:true,
      unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
   email:{
    type:String,
    required:true,
      unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
   fullname:{
    type:String,
    required:true,
    lowercase:true,
    index:true
  },
   avatar:{
    type:String, //cloudinary URL
      unique:true,
  },
   coverImage:{
    type:String,
  },
   password:{
    type:String,
    required:[true,"password is required"],
      unique:true, 
    lowercase:true,
  },
   refreshToken:{
    type:String,
  }
},{timestamps:true})

//
//hashing the password just before saving the userdata or any password update
Userschema.pre("save",async function(){
  if(!this.isModified("password"))return
    this.password=await bcrypt.hash(this.password,10)

})

//
//during login , varyfying the password stored in db
Userschema.methods.isPasswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password)
}

//generating accesstoken for client verification
 Userschema.methods.generateAccessToken=function(){
  return jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username,
      fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
 }

 //generating refreshtoken for regenerating accesstoken on expiry
 Userschema.methods.generateRefreshToken=function(){
   return jwt.sign(
    {
      _id:this._id,
     
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
 }
export const User=model("User",Userschema);