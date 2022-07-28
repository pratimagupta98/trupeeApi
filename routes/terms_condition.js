const express = require("express");
const router = express.Router();
 

const {
    add_term_cond,
    get_term_cond,
    getone_term_cond,
    edit_term_cond
} = require("../controllers/terms_condition");

 
 
 router.post("/admin/add_term_cond", add_term_cond);
router.get("/admin/get_term_cond", get_term_cond);
router.get("/admin/getone_term_cond/:id",  getone_term_cond)
router.post("/admin/edit_term_cond/:id",  edit_term_cond);


module.exports = router;

