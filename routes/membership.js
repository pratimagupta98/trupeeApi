const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    addmembership,
    allmembership,
    viewonemembership,
    updatemembership,
    dlt_membership,
    addMemeberShip,
    verifyCode

} = require("../controllers/membership");

 

 
 
 
 router.post("/user/addmembership", addmembership);
router.get("/admin/allmembership", allmembership);
 router.get("/admin/viewonemembership/:id", viewonemembership);
 router.post("/admin/updatemembership/:id", updatemembership);
 router.get("/admin/dlt_membership/:id", dlt_membership);

 router.post("/user/addMemeberShip", addMemeberShip);
 router.post("/user/verifyCode", verifyCode);


module.exports = router;
