const express = require("express");
const router = express.Router();
 

const {
    addTrade,
   
} = require("../controllers/alltrade");

 
 
 router.post("/admin/addTrade", addTrade);
// router.get("/admin/appriciation_list", appriciation_list);
// router.get("/admin/dlt_appriciation/:id", dlt_appriciation);

module.exports = router;

