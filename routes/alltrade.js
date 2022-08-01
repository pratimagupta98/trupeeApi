const express = require("express");
const router = express.Router();
 

const {
    addTrade,
    tradelist,
    getone_tradelist
   
} = require("../controllers/alltrade");

 
 
 router.post("/admin/addTrade", addTrade);
 router.get("/admin/tradelist", tradelist);
 router.get("/admin/getone_tradelist/:id", getone_tradelist);

module.exports = router;

