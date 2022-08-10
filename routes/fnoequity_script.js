const express = require("express");
const router = express.Router();
 

const {
    addEquityScript,
    getEquityScript,
    getone_fnoIndex,
    edit_fnoIndex,
    dltEquityScript
} = require("../controllers/fnoequity_script");

 
 
 router.post("/admin/addEquityScript", addEquityScript);
 router.get("/admin/getEquityScript", getEquityScript);
 //router.get("/admin/getone_fnoIndex/:id", getone_fnoIndex);
 //router.post("/admin/edit_fnoIndex/:id", edit_fnoIndex);
 router.get("/admin/dltEquityScript/:id", dltEquityScript);

module.exports = router;

