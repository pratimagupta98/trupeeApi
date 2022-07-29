const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    addmembership,
    allmembership,
    viewonemembership,
    updatemembership

} = require("../controllers/membership");

 

 
 
 
 router.post("/user/addmembership", addmembership);
router.get("/admin/allmembership", allmembership);
 router.get("/admin/viewonemembership/:id", viewonemembership);
 router.post("/admin/updatemembership/:id", updatemembership);


module.exports = router;
