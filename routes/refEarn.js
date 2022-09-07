const express = require("express");
const router = express.Router();
 

const {
    addRefEarn,
    addRefEarnnn,
    verifyCode
} = require("../controllers/refEarn");

 

 
 
 
 router.post("/admin/addRefEarn", addRefEarn);
 router.post("/admin/addRefEarnnn", addRefEarnnn);
 //router.post("/admin/verifyCode", verifyCode);


module.exports = router;

