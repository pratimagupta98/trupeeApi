const PnlSheet = require("../models/pnlsheet");
const resp = require("../helpers/apiResponse");
//const { uploadFile } = require("../helpers/awsuploader");
const { uploadBase64ImageFile } = require("../helpers/awsuploader");

//const findOrCreate = require('mongoose-find-or-create');
const fs = require("fs");

var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image.png",
  "/9j/": "image.jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}

exports.addPnlsheet = async (req, res) => {
  const { userId, pnlimg } = req.body;

  const newPnlSheet = new PnlSheet({
    userId: req.userId,
    pnlimg: pnlimg
  });

  if (pnlimg) {
    if (pnlimg) {


      const base64Data = new Buffer.from(pnlimg.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      detectMimeType(base64Data);
      const type = detectMimeType(pnlimg);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(
        base64Data,
        newPnlSheet.id,
        type
      );
      console.log(geturl, "&&&&");
      if (geturl) {
        newPnlSheet.pnlimg = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.pnlimg[0]?.filename}`);
      }
    }
  }
  newPnlSheet
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getPnlSheet = async (req, res) => {
  await PnlSheet.find().populate("userId")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.dltPnlsheet = async (req, res) => {
  await PnlSheet.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonePnlSheet = async (req, res) => {
  await PnlSheet.findOne({ _id: req.params.id }).populate("userId")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};