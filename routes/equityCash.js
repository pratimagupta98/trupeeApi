const express = require("express");
const router = express.Router();
 

const {
    add_equityCash,
    equityCash_list,
    getone_equityCash,
    edit_equityCash,
    dlt_equityCash
} = require("../controllers/equityCash");

 
 
 router.post("/admin/add_equityCash", add_equityCash);
 router.get("/admin/equityCash_list", equityCash_list);
 router.get("/admin/getone_equityCash/:id", getone_equityCash);
 router.post("/admin/edit_equityCash/:id", edit_equityCash);
 router.get("/admin/dlt_equityCash/:id", dlt_equityCash);

module.exports = router;

