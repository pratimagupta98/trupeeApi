const express = require("express");
const router = express.Router();
 

const {
    addCashScript,
    getCashScript,
    getoneCashScript,
    editCashScript,
    dltCashScript
} = require("../controllers/cash_script");

 
 
 router.post("/admin/addCashScript", addCashScript);
 router.get("/admin/getCashScript", getCashScript);
 router.get("/admin/getoneCashScript/:id", getoneCashScript);
 router.post("/admin/editCashScript/:id", editCashScript);
 router.get("/admin/dltCashScript/:id", dltCashScript);

module.exports = router;

