const express = require("express");
const router = express.Router();
 

const {
    addFnoScript,
    getFnoScript,
    getone_fnoIndex,
    edit_fnoIndex,
    dltFnoScript
} = require("../controllers/fnoindex_script");

 
 
 router.post("/admin/addFnoScript", addFnoScript);
 router.get("/admin/getFnoScript", getFnoScript);
 //router.get("/admin/getone_fnoIndex/:id", getone_fnoIndex);
 //router.post("/admin/edit_fnoIndex/:id", edit_fnoIndex);
 router.get("/admin/dltFnoScript/:id", dltFnoScript);

module.exports = router;

