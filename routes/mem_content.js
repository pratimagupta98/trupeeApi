const express = require("express");
const router = express.Router();
 

const {
    add_memeContent,
    getContent,
    getone_content,
    edit_content,
    dlt_content
} = require("../controllers/mem_content");

 
 
 router.post("/admin/add_memeContent", add_memeContent);
router.get("/admin/getContent", getContent);
router.get("/admin/getone_content/:id",getone_content)
router.post("/admin/edit_content/:id",edit_content);
router.get("/admin/dlt_content/:id", dlt_content)


module.exports = router;

