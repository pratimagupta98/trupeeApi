const express = require("express");
const router = express.Router();
 

const {
    addTrade,
    tradelist,
    getone_tradelist,
    edit_trade,
    dlt_trade
} = require("../controllers/alltrade");

 
 
 router.post("/admin/addTrade", addTrade);
 router.get("/admin/tradelist", tradelist);
 router.get("/admin/getone_tradelist/:id", getone_tradelist);
 router.post("/admin/edit_trade/:id", edit_trade);
 router.get("/admin/dlt_trade/:id", dlt_trade);

module.exports = router;

