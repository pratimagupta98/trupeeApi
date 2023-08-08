const Tuniversity = require("../models/trupe_university");
const resp = require("../helpers/apiResponse");
//const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
const { create } = require("../models/startup");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_Tuniversity = async (req, res) => {
  const { title, desc, video_link } =
    req.body;

  
  
  const newTuniversity = new Tuniversity({
    title: title,
    desc: desc,
    video_link: video_link,
    
  });

   
  
  newTuniversity.save()


      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.get_Tuniversity= async (req, res) => {
    await Tuniversity.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_Tuniversity = async (req, res) => {
    await Tuniversity.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_Tuniversity = async (req, res) => {

    const { title, desc,video_link} =
    req.body;
    data = {};
   if (title) {
     data.title = title;
   }
   if (desc) {
     data.desc = desc;
   }
   if(video_link){
data.video_link =video_link
   }
  
  if (data) {
    await Tuniversity.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}
  

  exports.dlt_Tuniversity = async (req, res) => {
    await Tuniversity.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  