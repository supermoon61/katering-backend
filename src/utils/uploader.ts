import * as multer from 'multer';
import {videoFilter} from './index'

export const storage =multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './uploaded/intros/')
    },
    
    filename: function (_req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
  })  

  export const upload=multer({storage: storage, fileFilter : videoFilter});