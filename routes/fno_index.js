const express = require("express");
const router = express.Router();
 

const {
    add_fnoIndex,
    fnoIndexlist,
    getone_fnoIndex,
    edit_fnoIndex,
    dlt_fnoIndex
} = require("../controllers/fno_index");

 
 
 router.post("/admin/add_fnoIndex", add_fnoIndex);
 router.get("/admin/fnoIndexlist", fnoIndexlist);
 router.get("/admin/getone_fnoIndex/:id", getone_fnoIndex);
 router.post("/admin/edit_fnoIndex/:id", edit_fnoIndex);
 router.get("/admin/dlt_fnoIndex/:id", dlt_fnoIndex);

module.exports = router;

