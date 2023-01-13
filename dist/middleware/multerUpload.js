"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// configure multer for your server folder
var storage = multer_1.default.diskStorage({
    //@ts-ignore
    destination: (req, file, cb) => {
        //ensure that this folder already exists in your project directory
        cb(null, "../../uploads");
    },
    //@ts-ignore
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
//Filter the image type
//@ts-ignore
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(form-data)＄/)) { //If the file uploaded is not any of this file type
        // If error in file type, then attacch this error to the request header
        req.fileValidationError = "You can upload only image files";
        return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
};
//Here we configure what our storage and filefilter will be, which is the storage and imageFileFilter we created above
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter: imageFileFilter });
