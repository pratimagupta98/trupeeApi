const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");


const {
    addFeedback,
    getFeedback,
    dltFeedback
} = require("../controllers/feedback");

 

 
 
 
 router.post("/admin/addFeedback",verifytoken, addFeedback);
router.get("/admin/getFeedback", getFeedback);
  router.get("/admin/dltFeedback/:id", dltFeedback);

module.exports = router;



















 