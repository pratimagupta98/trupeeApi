const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    addPlan,
    plan_list,
    editplan,
    viewoneplan
} = require("../controllers/plan");

 

 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/admin/addPlan", addPlan);
router.get("/admin/plan_list", plan_list);
router.post("/admin/editplan/:id", editplan);
router.get("/admin/viewoneplan/:id", viewoneplan);

module.exports = router;
