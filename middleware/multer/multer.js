"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = exports.generateFilename = void 0;
const multer_1 = __importDefault(require("multer"));
const mime_1 = __importDefault(require("mime"));
const generateFilename = (mimeType, originalname) => {
    //const randomFilename = `${randomUUID()}-${Date.now()}}`;
    const [randomFilename,] = originalname.split(".");
    const fileExtension = mime_1.default.getExtension(mimeType);
    const fileName = `${randomFilename}.${fileExtension}`;
    //console.log(fileName);
    return fileName;
};
exports.generateFilename = generateFilename;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: (request, file, cb) => {
        return cb(null, (0, exports.generateFilename)(file.mimetype, file.originalname));
    },
});
const VALID_MIME_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_FILE_SIZE = 6 * 1024 * 1024;
const fileFilter = (request, file, cb) => {
    //console.log(file.mimetype);
    if (VALID_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    }
    else
        cb(new Error("Error: the file must be a jpg o png image"));
};
exports.multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
};
exports.default = (0, multer_1.default)({ storage, ...exports.multerOptions });
// export  const initMulterMiddleware = () => {
//   return multer({ storage, ...multerOptions });
// };
