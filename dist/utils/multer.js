"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = uploadFiles;
const multer_1 = __importDefault(require("multer"));
const middlewares_1 = require("../middlewares");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        throw new middlewares_1.BadRequest('Only image files are allowed!');
    }
};
const upload = (0, multer_1.default)({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        try {
            fileFilter(req, file, cb);
        }
        catch (err) {
            cb(err);
        }
    },
});
function uploadFiles(req, res, next) {
    const uploadMultiple = upload.array("files", 3);
    uploadMultiple(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            return next(new middlewares_1.BadRequest(`File upload failed: ${err.message}`));
        }
        else if (err) {
            return next(new middlewares_1.BadRequest(`An error occurred: ${err.message}`));
        }
        if (!req.files || req.files.length === 0) {
            return next(new middlewares_1.BadRequest("No files uploaded"));
        }
        next();
    });
}
