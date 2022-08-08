const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addTrending_chart,
    trendingchartby_type,
    getone_charts,
    edit_trendingChart,
    dlt_Chart,
    getAllChart
//   deletecreditcustomer,
//   updatcreditcustomer,
//   namefindcreditcustomer
} = require("../controllers/trending_charts");

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
  { name: "image", maxCount: 1 },
 
   // { name: "video_link", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//PATHS

router.post("/admin/addTrending_chart", multipleUpload, addTrending_chart);
router.get("/admin/trendingchartby_type/:id",trendingchartby_type);
router.get("/admin/getone_charts/:id", getone_charts);


 router.post("/admin/edit_trendingChart/:id", multipleUpload, edit_trendingChart);
 router.get("/admin/dlt_Chart/:id", dlt_Chart);
 router.get("/admin/getAllChart", getAllChart);

 
//router.post("/admin/adminlogin", adminlogin);
module.exports = router;
 