const express = require("express");
const router = express.Router();
 

const {
    addper_Sheet,
    getPerSheet,
    getonePersheet,
    editPersheet,
    dltPerSheet
} = require("../controllers/prformncesheet");

 

 
 
 
 router.post("/admin/addper_Sheet", addper_Sheet);
router.get("/admin/getPerSheet", getPerSheet);
router.get("/admin/getonePersheet/:id", getonePersheet);

router.post("/admin/editPersheet/:id", editPersheet);
router.get("/admin/dltPerSheet/:id", dltPerSheet);

module.exports = router;

