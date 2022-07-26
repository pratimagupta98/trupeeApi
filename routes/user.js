const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    signupsendotp,
    getuser,
    editprofile
   
} = require("../controllers/user");

 

 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/user/signupsendotp", signupsendotp);
router.get("/admin/getuser", getuser);
router.post("/user/editprofile/:id", editprofile);

module.exports = router;
