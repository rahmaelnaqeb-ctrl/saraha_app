import multer from "multer";
import path from "path";
import fs from "fs";
import { customAlphabet } from "nanoid";
// import { allowedExtensions } from './multer.service';
const nanoid = customAlphabet("1234567890abcdef", 10); // Generate a random string of 10 characters

//
export const allowedExtensions={
    Images:["image/jpeg", "image/png", "image/avif"],
    Files:["application/pdf"],
    Videos:["video/mp4"]
};


export const MulterFunction = (allowedExtensionsArr,custompath) => {
    //where ?
     const destpath = custompath ? path.resolve(custompath) : path.resolve("uploads");
     if (!fs.existsSync(destpath)) {
        fs.mkdirSync(destpath, { recursive: true });
    }
    //what?

    // storage ram or harddisk
    const storage = multer.diskStorage({
        // where to store the file(destination) and what to name the file(filename)
        destination:function (req, file, cb) {
            cb(null, destpath) // specify the destination folder
        },
        // what to name the file
        filename:function (req, file, cb) {
            //handle bug 1 .. overwrite file name
            const uniqueName = `${nanoid()}+${file.originalname}`;
            cb(null, uniqueName) // specify the filename
        }
    })
    //filefilter
    const FileFilter = (req, file, cb) => {

        if(allowedExtensionsArr.includes(file.mimetype)){
          return  cb(null, true); 
        }

        cb(new Error(`Invalid file type: ${file.mimetype}`), false);

    };
    const limits = function(req,file,cb){
        cb(null)
    }
    //return multer({ fileFilter: FileFilter, storage });
    const upload = multer({ fileFilter: FileFilter,limits:{filesize:1024*1024*5}, storage});
    return upload;
}
