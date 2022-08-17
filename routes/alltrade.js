const express = require("express");
const router = express.Router();
 

const {
    add_fnoIndex,
    add_fnoEquity,
    add_equityCash,
    tradelist,
    fno_index_list,
    fno_equity_list,
    equity_Cash_list,
    getone_tradelist,
    edit_trade,
    dlt_trade
} = require("../controllers/alltrade");

 
 
 router.post("/admin/add_fnoIndex", add_fnoIndex);
 router.post("/admin/add_fnoEquity", add_fnoEquity);
 router.post("/admin/add_equityCash", add_equityCash);

 router.get("/admin/tradelist", tradelist);
 router.get("/admin/fno_index_list", fno_index_list);
 router.get("/admin/fno_equity_list", fno_equity_list);
 router.get("/admin/equity_Cash_list", equity_Cash_list);

//  router.get("/admin/getone_tradelist/:id", getone_tradelist);
//  router.post("/admin/edit_trade/:id", edit_trade);
//  router.get("/admin/dlt_trade/:id", dlt_trade);

module.exports = router;

