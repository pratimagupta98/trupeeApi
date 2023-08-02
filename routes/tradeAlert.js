const express = require("express");
const router = express.Router();


const {
    send_tradeAlert,
    tradeAlertList,
    getone_tradeAlert,
    edit_tradeAlert,
    dlt_tradeAlert
} = require("../controllers/tradeAlert");



router.post("/admin/send_tradeAlert", send_tradeAlert);
router.get("/admin/tradeAlertList", tradeAlertList);
router.get("/admin/getone_tradeAlert/:id", getone_tradeAlert)
router.post("/admin/edit_tradeAlert/:id", edit_tradeAlert);
router.get("/admin/dlt_tradeAlert/:id", dlt_tradeAlert);



module.exports = router;

