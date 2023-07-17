const express = require("express");
const router = express.Router();
 

const {
    addPrmiumSrvc,
    serviceslist,
    editService,
    viewoneService,
    dltPsrvc
} = require("../controllers/prmiumSrvc");

 
 router.post("/admin/addPrmiumSrvc", addPrmiumSrvc);
 router.post("/admin/editService/:id", editService);
 router.get("/admin/viewoneService/:id", viewoneService);
 router.get("/admin/serviceslist", serviceslist);
 router.get("/admin/dltPsrvc/:id", dltPsrvc);


module.exports = router;

