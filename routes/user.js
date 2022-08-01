const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    signupsendotp,
    getuser,
    editprofile,
    deletuser,
    verifyotp
   
} = require("../controllers/user");

 

 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/user/signupsendotp", signupsendotp);
router.post("/user/verifyotp", verifyotp);

router.get("/admin/getuser", getuser);
router.post("/admin/editprofile/:id", editprofile);
router.get("/admin/deletuser/:id", deletuser);

module.exports = router;
