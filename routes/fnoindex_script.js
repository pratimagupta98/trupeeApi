const express = require("express");
const router = express.Router();
 

const {
    addFnoScript,
    getFnoScript,
    getoneFnoScript,
    editFnoScript,
    dltFnoScript
} = require("../controllers/fnoindex_script");

 
 
 router.post("/admin/addFnoScript", addFnoScript);
 router.get("/admin/getFnoScript", getFnoScript);
 router.get("/admin/getoneFnoScript/:id", getoneFnoScript);
 router.post("/admin/editFnoScript/:id", editFnoScript);
 router.get("/admin/dltFnoScript/:id", dltFnoScript);

module.exports = router;

