const express = require("express");
const router = express.Router();
 

const {
    add_discount,
    discount_list,
    viewone_discount,
    edit_discount,
    dlt_discount
} = require("../controllers/discount");

 
 
 router.post("/admin/add_discount", add_discount);
router.get("/admin/discount_list", discount_list);
router.get("/admin/viewone_discount/:id", viewone_discount);
router.post("/admin/edit_discount/:id", edit_discount);
router.get("/admin/dlt_discount/:id", dlt_discount);

module.exports = router;

