import {v2 as cloudinary} from "cloudinary"
 import fs from "fs"
import dotenv from "dotenv";
dotenv.config({
  path:"./.env "
});


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET  ,
    });


    //permanent upload of file on cloudinary
    const uploadOnCloudinary=async(localfilePath)=>{
      try {

        if(!localfilePath)return null;
      const uploadresult=await cloudinary.uploader.upload(localfilePath,{
        resource_type:"auto"
      })
      
      // console.log("file uplaoded succesfully on cloudinary",uploadresult)

// unlink the temp file stored on our server if its successfully saved to cloudinary, not needed now
      if(uploadresult){
        fs.unlinkSync(localfilePath)
      }
return uploadresult;
        
      } catch (error) {
// unlink the file if uplaod failed
        fs.unlinkSync(localfilePath)//remove the locally saved temperory  file, as the upload operastion got failed

        return null;
      }
    }

    export {uploadOnCloudinary}



