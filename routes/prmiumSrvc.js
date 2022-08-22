const express = require("express");
const router = express.Router();
 

const {
    addPrmiumSrvc,
    serviceslist
} = require("../controllers/prmiumSrvc");

 

 
 
 
 router.post("/admin/addPrmiumSrvc", addPrmiumSrvc);
 router.get("/admin/serviceslist", serviceslist);


module.exports = router;

