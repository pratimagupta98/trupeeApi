const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");


const {
    addFeedback,
    getFeedback,
    dltFeedback,
    getoneFeedback
} = require("../controllers/feedback");

 

 
 
 
 router.post("/admin/addFeedback",verifytoken, addFeedback);
router.get("/admin/getFeedback", getFeedback);
router.get("/admin/dltFeedback/:id", dltFeedback);
router.get("/admin/getoneFeedback/:id", getoneFeedback);


module.exports = router;



















 