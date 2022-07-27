const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    addMembership,
    membership_list,
    editMembership
} = require("../controllers/membership");

 

 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/admin/addMembership", addMembership);
router.get("/admin/membership_list", membership_list);
router.post("/admin/editMembership/:id", editMembership);

module.exports = router;
