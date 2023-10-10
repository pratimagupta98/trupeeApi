const TreadingChart = require("../models/trending_charts");
const resp = require("../helpers/apiResponse");
//const bcrypt = require("bcryptjs");
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

exports.addTrending_chart = async (req, res) => {
  const { title, desc, image, chart_type } =
    req.body;
  const newTreadingChart = new TreadingChart({
    title: title,
    desc: desc,
    image: image,
    chart_type: chart_type,
    
  });
    if (req.files.image) {
       
        alluploads = [];
        for (let i = 0; i < req.files.image.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.image[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.image[i].path);
          alluploads.push(resp.secure_url);
        }
        newTreadingChart.image = alluploads;
      }
    
    newTreadingChart.save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.trendingchartby_type= async (req, res) => {
    await TreadingChart.find({chart_type: req.params.id})
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_charts = async (req, res) => {
    await TreadingChart.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_trendingChart = async (req, res) => {

    const { title, desc,chart_type} =
    req.body;
    data = {};
   if (title) {
     data.title = title;
   }
   if (desc) {
     data.desc = desc;
   }
   if(chart_type) {
    data.chart_type =chart_type
   }
 
   if (req.files) {
    if (req.files.image) {
      alluploads = [];
      for (let i = 0; i < req.files.image.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.image[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.image[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.image = alluploads;
    }
 }
  
  if (data) {
    await TreadingChart.findOneAndUpdate(
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
  

  exports.dlt_Chart = async (req, res) => {
    await TreadingChart.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  


  exports.getAllChart = async (req, res) => {
    await TreadingChart.find()
    .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  