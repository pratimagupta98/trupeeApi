const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");


const {
    add_appriciation,
    appriciation_list,
    dlt_appriciation
} = require("../controllers/appriciation");

 
 
 router.post("/user/add_appriciation",verifytoken, add_appriciation);
router.get("/admin/appriciation_list", appriciation_list);
router.get("/admin/dlt_appriciation/:id", dlt_appriciation);

module.exports = router;

