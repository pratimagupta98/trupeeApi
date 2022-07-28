const express = require("express");
const router = express.Router();
 

const {
    add_appriciation,
    appriciation_list,
    
} = require("../controllers/appriciation");

 
 
 router.post("/user/add_appriciation", add_appriciation);
router.get("/admin/appriciation_list", appriciation_list);
 
module.exports = router;

