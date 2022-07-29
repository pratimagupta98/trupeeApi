const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addStartup,
     get_startup,
    getone_startup,
     edit_startup,
     dlt_startup
//   deletecreditcustomer,
//   updatcreditcustomer,
//   namefindcreditcustomer
} = require("../controllers/startup");

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
  { name: "image", maxCount: 1 },
 
   // { name: "video_link", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//PATHS

router.post("/admin/addStartup", multipleUpload, addStartup);
router.get("/admin/get_startup",get_startup);
router.get("/admin/getone_startup/:id", getone_startup);


 router.post("/admin/edit_startup/:id", multipleUpload, edit_startup);
 router.get("/admin/dlt_startup/:id", dlt_startup);

 
//router.post("/admin/adminlogin", adminlogin);
module.exports = router;
 