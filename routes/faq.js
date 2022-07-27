const express = require("express");
const router = express.Router();
 

const {
    addFAQ,
    faq_list,
    editprofile
   
} = require("../controllers/faq");

 

 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/admin/addFAQ", addFAQ);
router.get("/admin/faq_list", faq_list);
//router.post("/admin/editprofile/:id", editprofile);

module.exports = router;



















 