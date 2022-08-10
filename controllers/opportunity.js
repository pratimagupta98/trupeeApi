const Opportunity = require("../models/opportunity");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addOportunity= async (req, res) => {
  const { title,desc} = req.body;

  const newOpportunity = new Opportunity({
    title: title,
    desc:desc,
   });
   if (req.files) {
    if (req.files.img[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.img.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.img[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.img[i].path);
        alluploads.push(resp.secure_url);
      }
      newOpportunity.img = alluploads;
    }
  }
  newOpportunity.save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.getOportunity = async (req, res) => {
    await Opportunity.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneOportunity = async (req, res) => {
    await Opportunity.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editOportunity = async (req, res) => {
    await Opportunity.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltOportunity = async (req, res) => {
    await Opportunity.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  