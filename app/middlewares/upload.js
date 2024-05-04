const Multer = require("multer");
const storage = Multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] == "image") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type!"));
  }
};
const upload = Multer({
  storage,
  fileFilter,
  limits: {
    files: 1,
    fileSize: 30 * 1024 * 1024, // Maximum file size is 30MB
  },
});
module.exports = upload;