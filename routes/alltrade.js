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
    ttlCompletetrade
     
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

module.exports = router;
 
 