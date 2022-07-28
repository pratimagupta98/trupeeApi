const express = require("express");
const router = express.Router();
 

const {
    add_notification,
    get_notification,
    
} = require("../controllers/notification");

 
 
 router.post("/admin/add_notification", add_notification);
router.get("/admin/get_notification", get_notification);
 
module.exports = router;
