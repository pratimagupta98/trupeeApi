const express = require("express");
const router = express.Router();
 

const {
    addEquityScript,
    getEquityScript,
    getoneEquityScript,
    editEquityScript,
    dltEquityScript
} = require("../controllers/fnoequity_script");

 
 
 router.post("/admin/addEquityScript", addEquityScript);
 router.get("/admin/getEquityScript", getEquityScript);
 router.get("/admin/getoneEquityScript/:id", getoneEquityScript);
 router.post("/admin/editEquityScript/:id", editEquityScript);
 router.get("/admin/dltEquityScript/:id", dltEquityScript);

module.exports = router;

