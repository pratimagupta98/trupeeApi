const express = require("express");
const router = express.Router();
 

const {
    add_fnoEquity,
    fnoEquity_listt,
    getone_fnoEquity,
    edit_fnoEquity,
    dlt_fnoEquity
} = require("../controllers/fno_equity");

 
 
 router.post("/admin/add_fnoEquity", add_fnoEquity);
 router.get("/admin/fnoEquity_listt", fnoEquity_listt);
 router.get("/admin/getone_fnoEquity/:id", getone_fnoEquity);
 router.post("/admin/edit_fnoEquity/:id", edit_fnoEquity);
 router.get("/admin/dlt_fnoEquity/:id", dlt_fnoEquity);

module.exports = router;

