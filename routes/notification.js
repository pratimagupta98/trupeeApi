const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    add_notification,
    get_notification,
    dlt_notification,
    getone_notification,
    edit_notification
} = require("../controllers/notification");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      let path = `./uploads`;
      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg") ||
       file.mimetype.includes("pdf")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });
  
  let multipleUpload = uploads.fields([
    { name: "img", maxCount: 3 },
   
       
  ]);

 
 router.post("/admin/add_notification",multipleUpload, add_notification);
router.get("/admin/get_notification", get_notification);
router.get("/admin/dlt_notification/:id", dlt_notification);

router.get("/admin/getone_notification/:id", getone_notification);
router.post("/admin/edit_notification/:id", edit_notification);

module.exports = router;
 