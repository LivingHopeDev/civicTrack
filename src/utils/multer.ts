import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { BadRequest, HttpError } from "../middlewares";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    throw new BadRequest("Only image files are allowed!");
  }
};

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    try {
      fileFilter(req, file, cb);
    } catch (err) {
      cb(err as Error);
    }
  },
});

export function uploadFile(req: Request, res: Response, next: NextFunction) {
  const uploadSingle = upload.single("file");
  uploadSingle(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return next(new BadRequest(`File upload failed: ${err.message}`));
    } else if (err) {
      return next(new BadRequest(`An error occurred: ${err.message}`));
    }
    if (!req.file) {
      return next(new BadRequest("No file uploaded"));
    }

    next();
  });
}
export function uploadFiles(req: Request, res: Response, next: NextFunction) {
  const uploadMultiple = upload.array("files", 3);

  uploadMultiple(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      return next(new BadRequest(`File upload failed: ${err.message}`));
    } else if (err) {
      return next(new BadRequest(`An error occurred: ${err.message}`));
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return next(new BadRequest("No files uploaded"));
    }

    next();
  });
}
