const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
 

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
  var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
  console.log(err);
});
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const {
    addPnlsheet,
 
} = require("../controllers/pnlsheet");

//PATHS

router.post(
  "/admin/addPnlsheet",
   
  upload.fields([
    {
      name: "pnlimg",
    },
     
  ]),
  addPnlsheet
);

 


module.exports = router;
 

