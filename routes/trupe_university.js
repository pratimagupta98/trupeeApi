const express = require("express");
const router = express.Router();
 

const {
    add_Tuniversity,
    get_Tuniversity,
    getone_Tuniversity,
    edit_Tuniversity,
    dlt_Tuniversity
} = require("../controllers/trupe_university");

 

 
 
 
 router.post("/admin/add_Tuniversity", add_Tuniversity);
router.get("/admin/get_Tuniversity", get_Tuniversity);
router.get("/admin/getone_Tuniversity/:id", getone_Tuniversity);

router.post("/admin/edit_Tuniversity/:id", edit_Tuniversity);
router.get("/admin/dlt_Tuniversity/:id", dlt_Tuniversity);

module.exports = router;



















 