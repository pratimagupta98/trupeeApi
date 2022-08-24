const express = require("express");
const router = express.Router();
 

const {
    addExpDate,
    datelist,
    dltDate,
    editDate
   
} = require("../controllers/exp_date");

 
 
 router.post("/admin/addExpDate", addExpDate);
router.get("/admin/datelist", datelist);
router.get("/admin/dltDate/:id", dltDate);
router.post("/admin/editDate/:id", editDate);

module.exports = router;

