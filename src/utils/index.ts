
export const imageFilter = (_req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
  }}

  export const videoFilter = (_req: any,file: any,cb: any) => {
    if(file.mimetype === "video/mp4"  || 
       file.mimetype ==="video/mpeg"  || 
       file.mimetype ==="video/mpg"  || 
       file.mimetype ==="video/webm"  || 
       file.mimetype ===  "video/x-msvideo"){
     
    cb(null, true);
   }else{
      cb(new Error("Video uploaded is not of type mp4/mpeg/avi or webm"),false);
  }}