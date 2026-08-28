const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, {
      recursive: true
    });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;

    if (file.fieldname === "certificate") {
      folder = path.join(
        __dirname,
        "../../uploads/certificates"
      );
    } else if (file.fieldname === "inspectionImage") {
      folder = path.join(
        __dirname,
        "../../uploads/inspection-images"
      );
    } else {
      folder = path.join(
        __dirname,
        "../../uploads/documents"
      );
    }

    createFolder(folder);

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, JPG, JPEG and PNG files are allowed"
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;