
import * as fs from "fs";
export const checkBannerFolder = new Promise<boolean>((resolve, reject) => {
    if (fs.existsSync("./uploaded/banners")) {
      //console.log("Directory exists.")
      resolve(true)
    } else {
      //console.log("Directory does not exist.")
      //make new folder
      fs.mkdir("./uploaded/banners", { recursive: true }, function(err) {
        if (err) {
          console.log(err)
          reject(false)
        } else {
          console.log("New directory successfully created.")
          resolve(true)
        }
      })
    }
  });

  export const checkIntroFolder = new Promise<boolean>((resolve, reject) => {
    if (fs.existsSync("./uploaded/intros")) {
      //console.log("Directory exists.")
      resolve(true)
    } else {
      console.log("Directory does not exist.")
      //make new folder
      fs.mkdir("./uploaded/intros", { recursive: true }, function(err) {
        if (err) {
          console.log(err)
          reject(false)
        } else {
         // console.log("New directory successfully created.")
          resolve(true)
        }
      })
    }
  });