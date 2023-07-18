const express = require("express");
const router = express.Router();


const {
    addFAQ,
    faq_list,
    editprofile,
    dltFaq,
    getoneFaq,
    edit_faq

} = require("../controllers/faq");



router.post("/admin/addFAQ", addFAQ);
router.get("/admin/faq_list", faq_list);
router.get("/admin/dltFaq/:id", dltFaq);
router.get("/admin/getoneFaq/:id", getoneFaq);
router.post("/admin/edit_faq/:id", edit_faq);


module.exports = router;

