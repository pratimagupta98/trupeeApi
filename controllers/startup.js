const Startup = require("../models/startup");
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

exports.addStartup = async (req, res) => {
  const { title, desc, image, video_link } =
    req.body;
  const newStartup = new Startup({
    title: title,
    desc: desc,
    image: image,
    video_link: video_link,
    
  });

 
  if (req.files.image) {
    const alluploads = [];
    for (let i = 0; i < req.files.image.length; i++) {
      const resp = await cloudinary.uploader.upload(
        req.files.image[i].path,
        { use_filename: true, unique_filename: false }
      );
      fs.unlinkSync(req.files.image[i].path);
      alluploads.push(resp.secure_url);
    }
    newStartup.image = alluploads;
  }

      newStartup.save()


      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.get_startup= async (req, res) => {
    await Startup.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_startup = async (req, res) => {
    await Startup.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_startup = async (req, res) => {

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
    await Startup.findOneAndUpdate(
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
  

  exports.dlt_startup = async (req, res) => {
    await Startup.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  