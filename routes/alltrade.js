const express = require("express");
const router = express.Router();
 

const {
    add_fnoIndex,
    add_fnoEquity,
    add_equityCash,
    tradelist,
    fnoIndexlist,
    fnoEquity_list,
    equityCash_list,
    getone_tradelist,
    edit_trade,
    dlt_alltrade
} = require("../controllers/alltrade");

 
 
 router.post("/admin/add_fnoIndex", add_fnoIndex);
 router.post("/admin/add_fnoEquity", add_fnoEquity);
 router.post("/admin/add_equityCash", add_equityCash);

 router.get("/admin/tradelist", tradelist);
 router.get("/admin/fnoIndexlist", fnoIndexlist);
 router.get("/admin/fnoEquity_list", fnoEquity_list);
 router.get("/admin/equityCash_list", equityCash_list);

//  router.get("/admin/getone_tradelist/:id", getone_tradelist);
//  router.post("/admin/edit_trade/:id", edit_trade);
  router.get("/admin/dlt_alltrade/:id", dlt_alltrade);

module.exports = router;
 
