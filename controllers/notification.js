const Notification = require("../models/notification");
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

exports.add_notification = async (req, res) => {
  const { title,desc,img} = req.body;

  const newNotification = new Notification({
    title: title,
    desc:desc,
     
   });

  const findexist = await Notification.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {


  
   


    if (req.files.img) {
        
        alluploads = [];
        for (let i = 0; i < req.files.img.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.img[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.img[i].path);
          alluploads.push(resp.secure_url);
        }
        newNotification.img = alluploads;
      }
   
    newNotification
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.get_notification = async (req, res) => {
    await Notification.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_notification = async (req, res) => {
    await Notification.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_notification = async (req, res) => {
    await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_notification = async (req, res) => {
    await Notification.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  