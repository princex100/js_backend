import mongoose,{Schema,model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const Videoschema=new Schema({
  videoFile:{
    type:String,
    required:true,
    trim:true,
    index:true
  },
   thumbnail:{
    type:String,
    required:true,
    trim:true
  },
   owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  title:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  duration:{
    type:Number,
    required:true,
  },
   views:{
    type:Number,
    default:0,
    required:true,
  },
   isPublished:{
    type:Boolean,
    default:true,
    required:true,
  },
  
  
  
},{timestamps:true})


Videoschema.plugin(mongooseAggregatePaginate)

export const Video=model("Video",Videoschema) 