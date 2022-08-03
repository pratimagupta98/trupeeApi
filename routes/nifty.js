const express = require("express");
const router = express.Router();
 

const {
    addNifty,
    getNifty,
    dltNifty,
   
} = require("../controllers/nifty");

 
 
 router.post("/admin/addNifty", addNifty);
router.get("/admin/getNifty", getNifty);
router.get("/admin/dltNifty/:id", dltNifty);
 
module.exports = router;

