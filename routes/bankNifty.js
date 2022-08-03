const express = require("express");
const router = express.Router();
 

const {
    addBankNifty,
    getBankNifty,
    dltBankNifty,
   
} = require("../controllers/bankNifty");

 
 
 router.post("/admin/addBankNifty", addBankNifty);
router.get("/admin/getBankNifty", getBankNifty);
router.get("/admin/dltBankNifty/:id", dltBankNifty);
 
module.exports = router;

