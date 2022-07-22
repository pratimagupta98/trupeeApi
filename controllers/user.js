const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

//   exports.signupsendotp = async (req, res) => {
//       let length = 6;
//     //   let otp = (
//     //     "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
//     //   ).slice(-length);
//     let otp = "123456";
  
//     const newUser = new User({
//       mobile: mobile,
//     });
//     const findexist = await User.findOne({ mobile :mobile });
//     if (findexist) {
//       res.json({
//         status: "success",
//         msg: "Welcome Back Otp send successfully",
//         registered: findexist?.mobile,
//         _id: findexist?._id,
//         otp: otp,
//       });
//     } else {
//         newUser.otp = otp;
//         newUser
//         .save()
//         .then((data) =>
//           res.json({
//             status: "success",
//             msg: "Otp send successfully",
//             registered: data?.mobile,
//             _id: data?._id,
//             otp: otp,
//           })
//         )
//         .catch((error) => {
//             res.status(400).json({
//               status: false,
//               msg: "error",
//               error: error,
//             });
//           });
//     }
//   };



exports.signupsendotp  = async ( res,req) => {
    const {
        fullname
      } = req.body;
      console.log("DATA",req.body)
    const newUser = new User({
        fullname:req.body.fullname
      });
      newUser.save().then((data)=>{
        res.status(200).json({
          status : true,
          msg : "success",
          data : data
        })
      }).catch((error)=>{
        res.status(400).json({
          status : false,
          msg : "error",
          error :error
        })
      })
    }
