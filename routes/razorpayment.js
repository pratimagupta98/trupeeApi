const express = require("express");
const router = express.Router();
 
const { verifytoken } = require("../functions/verifytoken");

const {
    razorPayment,
    getpayment,
    
} = require("../controllers/razorpayment");

 

 
 
 
 router.post("/admin/razorPayment",verifytoken, razorPayment);
 router.post("/admin/getpayment", getpayment);
  


module.exports = router;

