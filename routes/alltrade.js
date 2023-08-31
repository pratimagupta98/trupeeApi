const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    add_fnoIndex,
    add_fnoEquity,
    add_equityCash,
    tradelist,
    fnoIndexlist,
    fnoEquity_list,
    equityCash_list,
    viewonetrades,
    editalltrade,
    dlt_alltrade,
    editFnoindex,
    editfnoOption,
    AppindexList,
    AppOptionList,
    AppCashList,
    editCash,
    add_notificationss,
    notificationList,
    addTnotification,
    totlactivetrade,
    ttlCompletetrade,
    datefilter,
    completedTrade,
    updatefnoindex,
    tradeHistory,
    dateSrchFltr,
    getweekdaywisedata,
    today_profit_loss,
    weekely_profit_loss,
    monthly_profit_loss,
    tradefilterBydate,
    activeTradeList,
    Scriptlist,
    profit_loss_byDate

     
} = require("../controllers/alltrade");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploads`;
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
     file.mimetype.includes("pdf")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([
  { name: "img", maxCount: 3 },
  
 
     
]);
 
 
 router.post("/admin/add_fnoIndex", add_fnoIndex);
 router.post("/admin/add_fnoEquity", add_fnoEquity);
 router.post("/admin/add_equityCash", add_equityCash);

 //app api
 router.get("/admin/tradelist", tradelist);
 router.get("/admin/AppindexList", AppindexList);
 router.get("/admin/AppOptionList", AppOptionList);
 router.get("/admin/AppCashList", AppCashList);

 router.get("/admin/fnoIndexlist", fnoIndexlist);
 router.get("/admin/fnoEquity_list", fnoEquity_list);
 router.get("/admin/equityCash_list", equityCash_list);

 router.get("/admin/viewonetrades/:id", viewonetrades);
  router.post("/admin/editalltrade/:id", editalltrade);
  router.get("/admin/dlt_alltrade/:id", dlt_alltrade);
  router.post("/admin/editFnoindex/:id", editFnoindex);
  router.post("/admin/editfnoOption/:id", editfnoOption);
  router.post("/admin/editCash/:id", editCash);

  router.post("/admin/add_notificationss",multipleUpload, add_notificationss);
  router.get("/admin/notificationList", notificationList);
  router.post("/admin/addTnotification", addTnotification);
 
  router.get("/admin/totlactivetrade", totlactivetrade);
  router.get("/admin/ttlCompletetrade", ttlCompletetrade);
  router.get("/admin/datefilter", datefilter);
  router.get("/admin/completedTrade", completedTrade);
  router.get("/admin/tradeHistory/:id", tradeHistory);
  router.get("/admin/dateSrchFltr/:date", dateSrchFltr);

  router.get("/admin/getweekdaywisedata", getweekdaywisedata);

  router.get("/admin/today_profit_loss", today_profit_loss);
  router.get("/admin/weekely_profit_loss", weekely_profit_loss);
  router.get("/admin/monthly_profit_loss", monthly_profit_loss);
  router.get("/user/tradefilterBydate", tradefilterBydate);

  router.get("/user/Scriptlist/:type", Scriptlist);

  

  router.get("/admin/activeTradeList", activeTradeList);
  router.get("/admin/profit_loss_byDate/:date", profit_loss_byDate);

module.exports = router;
 
