import multer from "multer";
import { randomUUID } from "crypto";
import mime from "mime";

export const generateFilename = (mimeType: string,originalname:string):string => {
  //const randomFilename = `${randomUUID()}-${Date.now()}}`;
  const [randomFilename,] = originalname.split(".")
  const fileExtension = mime.getExtension(mimeType);
  const fileName = `${randomFilename}.${fileExtension}`;
  //console.log(fileName);
  
  return fileName;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (request, file, cb) => {
    return cb(null, generateFilename(file.mimetype,file.originalname));
  },
});

const VALID_MIME_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_FILE_SIZE = 6 * 1024 * 1024;
const fileFilter: multer.Options["fileFilter"] = (request, file, cb) => {
  //console.log(file.mimetype);
  
  if (VALID_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else cb(new Error("Error: the file must be a jpg o png image"));
};
export const multerOptions = {
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
};

export default multer({ storage, ...multerOptions });
// export  const initMulterMiddleware = () => {
//   return multer({ storage, ...multerOptions });
// };
