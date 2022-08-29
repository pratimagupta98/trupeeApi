const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");
const { verifytoken } = require("../functions/verifytoken");

const {
    signupsendotp,
    getuser,
    viewoneuser,
    editprofile,
    deletuser,
    verifyotp,
    myprofile,
    uploadImageBase64,
    getoneuser,
    dltMyaccount
} = require("../controllers/user");

 
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
    { name: "userimg", maxCount: 1 },
   
    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
  ]);
  
 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/user/signupsendotp", signupsendotp);
router.post("/user/verifyotp", verifyotp);

router.get("/admin/getuser", getuser);
router.get("/user/viewoneuser",verifytoken, viewoneuser);

router.post("/admin/editprofile/:id", editprofile);
router.post("/user/myprofile",verifytoken,myprofile);
//router.post("/user/uploadImageBase64", multipleUpload,verifytoken,uploadImageBase64);
router.get("/admin/getoneuser/:id", getoneuser);

router.get("/admin/deletuser/:id", deletuser);
router.get("/admin/dltMyaccount/:id", dltMyaccount);

module.exports = router;
 