const express = require("express");
const router = express.Router();
 

const {
    addPrmiumSrvc,
    serviceslist,
    dltPsrvc
} = require("../controllers/prmiumSrvc");

 

 
 
 
 router.post("/admin/addPrmiumSrvc", addPrmiumSrvc);
 router.get("/admin/serviceslist", serviceslist);
 router.get("/admin/dltPsrvc/:id", dltPsrvc);


module.exports = router;

