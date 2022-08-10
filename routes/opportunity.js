const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
 

const {
    addOportunity,
    getOportunity,
    getoneOportunity,
    editOportunity,
    dltOportunity
} = require("../controllers/opportunity");

 
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
    { name: "img", maxCount: 1 },
   
     // { name: "video_link", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
  ]);
  

 
 router.post("/admin/addOportunity",multipleUpload,addOportunity);
router.get("/admin/getOportunity", getOportunity);
router.get("/admin/getoneOportunity/:id", getoneOportunity);

router.post("/admin/editOportunity/:id",multipleUpload, editOportunity);
router.get("/admin/dltOportunity/:id", dltOportunity);

 
module.exports = router;
