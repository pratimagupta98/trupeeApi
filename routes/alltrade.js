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
    viewonetrades,
    editalltrade,
    dlt_alltrade,
    editFnoindex,
    editfnoOption,
    AppindexList,
    AppOptionList,
    AppCashList,
    editCash
} = require("../controllers/alltrade");

 
 
 router.post("/admin/add_fnoIndex", add_fnoIndex);
 router.post("/admin/add_fnoEquity", add_fnoEquity);
 router.post("/admin/add_equityCash", add_equityCash);

 //app api
 router.get("/admin/tradelist", tradelist);
 router.get("/admin/AppindexList", AppindexList);
 router.get("/admin/AppOptionList", AppOptionList);
 router.get("/admin/AppCashList", AppCashList);

 router.get("/admin/fnoIndexlist", fnoIndexlist);
 router.get("/admin/fnoEquity_list", fnoEquity_list);
 router.get("/admin/equityCash_list", equityCash_list);

 router.get("/admin/viewonetrades/:id", viewonetrades);
  router.post("/admin/editalltrade/:id", editalltrade);
  router.get("/admin/dlt_alltrade/:id", dlt_alltrade);
  router.post("/admin/editFnoindex/:id", editFnoindex);
  router.post("/admin/editfnoOption/:id", editfnoOption);
  router.post("/admin/editCash/:id", editCash);


module.exports = router;
 
