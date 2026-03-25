import path from "path"
import fs from "fs"
import multer from "multer"


//checking if the storage path exist or not || if not then create folder
const tempdir=path.resolve("public/temp");

if(!fs.existsSync(tempdir)){
    fs.mkdirSync(tempdir)
}


//our custom configurations of how multer will store the incoming files
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,tempdir);
  }
  ,
  filename:function(req,file,cb){
     const uniquesuffix=Math.round(Math.random()*1e9);
     const extension=path.extname(file.originalname);
     cb(null,file.fieldname+uniquesuffix+extension);

  }
})


// this will create am object having our storage configurations and some methods like .single() that will be used while calling the middleware 
export const upload=multer({storage});