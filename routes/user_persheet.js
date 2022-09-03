const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");


const {
    ad_user_persheet,
    get_userPerSheet,
    getone_userPersheet,
    edit_userPersheet ,
    dlt_userPerSheet
} = require("../controllers/user_persheet");

 

 
 
 
 router.post("/user/ad_user_persheet",verifytoken, ad_user_persheet);
router.get("/admin/get_userPerSheet", get_userPerSheet);
router.get("/admin/getone_userPersheet/:id", getone_userPersheet);

router.post("/admin/edit_userPersheet/:id", edit_userPersheet);
router.get("/admin/dlt_userPerSheet/:id", dlt_userPerSheet);

module.exports = router;

