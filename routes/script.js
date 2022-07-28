const express = require("express");
const router = express.Router();
 

const {
    addScript,
    getScript,
    getone_script,
    editScript,
    deletescript
} = require("../controllers/script");

 

 
 
 
 router.post("/admin/addScript", addScript);
router.get("/admin/getScript", getScript);
router.get("/admin/getone_script/:id", getone_script);

router.post("/admin/editScript/:id", editScript);
router.get("/admin/deletescript/:id", deletescript);

module.exports = router;



















 