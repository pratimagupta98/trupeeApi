const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    addmembership,
    allmembership,
    editplan,
    viewoneplan
} = require("../controllers/membership");

 

 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/user/addmembership", addmembership);
router.get("/admin/allmembership", allmembership);
// router.post("/admin/editplan/:id", editplan);
// router.get("/admin/viewoneplan/:id", viewoneplan);

module.exports = router;
