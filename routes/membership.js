const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");
const { verifytoken } = require("../functions/verifytoken");
const {
    addmembership,
    allmembership,
    viewonemembership,
    updatemembership,
    dlt_membership,
    addMemeberShip,
    refer_earn,
    freeMembership,
    ttlfreeusers
} = require("../controllers/membership");

 

 
 
 
 router.post("/user/addmembership",addmembership);
router.get("/admin/allmembership", allmembership);
 router.get("/admin/viewonemembership/:id", viewonemembership);
 router.post("/admin/updatemembership/:id", updatemembership);
 router.get("/admin/dlt_membership/:id", dlt_membership);

 router.post("/user/addMemeberShip",verifytoken, addMemeberShip);
 router.post("/user/refer_earn",verifytoken, refer_earn);
 router.post("/user/freeMembership",verifytoken, freeMembership);
 router.get("/admin/ttlfreeusers", ttlfreeusers);


module.exports = router;
