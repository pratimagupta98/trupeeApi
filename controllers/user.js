const User = require("../models/user");
const resp = require("../helpers/apiResponse");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const { uploadBase64ImageFile } = require("../helpers/apiResponse");

 const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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


exports.signupsendotp = async (req, res) => {
  let length = 6;
  //   let otp = (
  //     "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
  //   ).slice(-length);
  let otp = "123456";

  const newUser = new User({
    mobile: req.body.mobile,
  });
  const findexist = await User.findOne({ mobile: req.body.mobile });
  if (findexist) {
    res.json({
      status: "success",
      msg: "Welcome Back Otp send successfully",
      registered: findexist?.mobile,
      _id: findexist?._id,
       
      otp: otp,
    });
  } else {
    newUser.otp = otp;
    newUser
      .save()
      .then((data) =>
        res.json({
          status: "success",
          msg: "Otp send successfully",
          registered: data?.mobile,
          _id: data?._id,
          userId: data._id,
          otp: otp,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.verifyotp = async (req, res) => {

  const { mobile, otp } = req.body;
  const getuser = await User.findOne({ mobile: mobile });
  if (getuser) {
    if (otp == "123456") {
      if (getuser.userverified) {
        const token = jwt.sign(
          {
            userId: getuser._id,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "365d",
          }
        );
        
        await User.findOneAndUpdate(
          {
            _id: getuser._id,
          },
          { $set: { userverified: true } },
          { new: true }
        ).then((data) => {
          res.header("auth-token",token).status(200).send({
            status: "success",
            token: token,
            msg: "Welcome Back",
            otpverified: true,
            redirectto: "dashboard",
            _id: data?._id,
            userId: data._id,
            data: data,
          });
        });
      } else {
        if (!getuser.userverified) {
          const token = jwt.sign(
            {
              id: getuser._id,
            },
            key,
            {
              expiresIn: "365d",
            }
          );
          await User.findOneAndUpdate(
            {
              _id: getuser._id,
            },
            { $set: { userverified: true } },
            { new: true });
          res.json({
            status: "success",
            token: token,
            msg: "Continue signup",
            otpverified: true,
            redirectto: "signupdetail",
            _id: getuser._id,
          });
        }
      }
    } else {
      res.json({
        status: "failed",
        msg: "Incorrect OTP",
      });
    }
  } else {
    res.json({
      status: "error",
      msg: "User doesnot exist",
    });
  }
};

// exports.getuser = async (req, res) => {
//   const findall = await User.find().sort({
//     sortorder: 1,
//   });
//   if (findall) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findall,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };



exports.getuser = async (req, res) => {
  await User.find().sort({ createdAt: -1 })

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneuser = async (req, res) => {
  await User.findOne({ _id: req.userId})
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getoneuser = async (req, res) => {
  await User.findOne({ _id: req.params.id})
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.editprofile = async (req, res) => {
  const findandUpdateEntry = await User.findOneAndUpdate(
    {
      _id: req.params.id
    },
    { $set: req.body },
    { new: true }
  );

  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      status: "error",
      error: "error",
    });
  }
};
 

exports.myprofile = async (req, res) => {
  await User.findOneAndUpdate(
    {
      _id: req.userId,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
 
exports.deletuser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};




const mime = require('mime');
// exports.uploadImageBase64 = async (req, res, next) => {
//   // to declare some path to store your converted image
//   var matches = req.body.userimg.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
//   response = {};
   
//   if (matches.length !== 3) {
//   return new Error('Invalid input string');
//   }
   
//   response.type = matches[1];
//   response.data =  Buffer.from(matches[2], 'base64');
//   let decodedImg = response;
//   let imageBuffer = decodedImg.data;
//   let type = decodedImg.type;
//   let extension = mime.extension(type);
//   let fileName = "image." + extension;
//   try {
//   fs.writeFileSync("./uploads/" + fileName, imageBuffer, 'utf8');
//   return res.send({"status":"success"});
//   } catch (e) {
//   next(e);
//   }
//   }