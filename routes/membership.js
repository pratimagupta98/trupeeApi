const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    addmembership,
    allmembership,
    // editplan,
    // viewoneplan
} = require("../controllers/membership");

 

 
 
 
 router.post("/user/addmembership", addmembership);
//router.get("/admin/allmembership", allmembership);
 

module.exports = router;
