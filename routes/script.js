const express = require("express");
const router = express.Router();
 

const {
    addScript,
    getScript,
  
} = require("../controllers/script");

 

 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/admin/addScript", addScript);
router.get("/admin/getScript", getScript);
//router.post("/admin/editprofile/:id", editprofile);

module.exports = router;



















 