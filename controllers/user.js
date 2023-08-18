const User = require("../models/user");
const resp = require("../helpers/apiResponse");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const { uploadBase64ImageFile } = require("../helpers/apiResponse");
 const crypto = require("crypto");
 const moment = require('moment');


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
  let otp = "123456";
  
  const random_string = create_random_string(6);
  
  function create_random_string(string_length) {
    let random_string = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < string_length; i++) {
      random_string += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return random_string;
  }

  const newUser = new User({
    mobile: req.body.mobile,
    refral_Code: random_string,
    walletId: req.body.walletId,
    fcmToken: ""
  });

  const findexist = await User.findOne({ mobile: req.body.mobile });
  if (findexist) {
    res.json({
      status: "success",
      msg: "Welcome Back Otp send successfully",
      registered: findexist?.mobile,
      otp: otp,
    });
  } else {
    newUser.otp = otp;
    newUser.walletId = newUser._id;

    newUser
      .save()
      .then((result) => {
        res.status(200).json({
          // token: fcmToken, // This line is not defined, you might need to replace it
          status: "success",
          msg: "Otp send successfully",
          registered: result?.mobile,
          _id: result?._id,
          userId: result._id,
          otp: result.otp,
          refral_Code: random_string,
          walletId: result._id,
        });
      })
      .catch((error) => {
        console.error("Error in signupsendotp:", error); // Log the error for debugging
        res.status(400).json({
          status: false,
          msg: "An error occurred",
          error: error.message, // Send the error message in the response
        });
      });
  }
};

 
exports.adminverifyOtp = async (req, res) => {

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
        if (!getuser.userverified == true) {
          const token = jwt.sign(
            {
              id: getuser._id,
            },
            key,
            {
              expiresIn: "365d",
            }
            
          )
      //     res.header("auth-token", token).status(200).send({
      //       status: true,
      //       token: token,
      //       msg: "success",
      //     //  user: finddetails,
      //       //user_type: "user",
      //     });
      //   }
      // }
          await User.findOneAndUpdate(
            {
              _id: getuser._id,
            },
            { $set: { userverified: true } },
            { new: true })
            .then((data) => {
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
          // res.header("auth-token", token).status(200).send({
          //   status: "success",
          //   token:token,
          //   msg: "Continue signup",
          //   otpverified: true,
          //   userdata:userdata,
          //   redirectto: "signupdetail",
          //   _id: getuser._id,
          // });
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



// exports.adminverifyOtp = async (req, res) => {
//   const { mobile, otp } = req.body;

//   const findone = await User.findOne({ mobile: mobile });

//   if (findone) {
//     if (otp == "123456") {
//     const token = jwt.sign(
//       {
//         userId: findone._id,
//       },
//       process.env.TOKEN_SECRET,
//       {
//         expiresIn: 86400000,
//       }
//     )
//     // res.header("auth-token", token).status(200).send({
//     //   status: true,
//     //   token: token,
//     //   msg: "success",
//     //   user: findone,
//     // })
//     .then((result) => {
//       const token = jwt.sign(
//         {
//           userId: result._id,
//         },
//         process.env.TOKEN_SECRET,
//         {
//           expiresIn: 86400000,
//         }
//       );
//       res.header("auth-token", token).status(200).json({
//         status: true,
//         token: token,
//         msg: "success",
//         user: result,
//       });
//     })
//     res.status(200).json({
//       status: true,
//       msg: "otp verified",
//       data: findone,
//     });

//   } 
// }else {
//     res.status(200).json({
//       status: false,
//       msg: "Incorrect Otp",
//     });
//   }
// };



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
// exports.adminverifyOtp = async (req, res) => {
   
//     const { mobile, otp } = req.body;
//     const dealerDetail = await User.findOne({ mobile: mobile });
 
//     if(dealerDetail){
//       console.log("dealerDetail")
       
//       // if(otp == "123456"){

//         const token = jwt.sign(
//           {
//             userId: dealerDetail._id,
//           },
//           process.env.TOKEN_SECRET,
//           {
//             expiresIn: "365d",
//           }
//         )
//         res.status(200).send({
//           status: "success",
//           token: token,
//           msg: "Welcome Back",
//           otpverified: true,
//           redirectto: "dashboard",
//           _id: dealerDetail?._id,
//           userId: dealerDetail._id,
//           data: dealerDetail,
//         });




//       }
 

//  }

// exports.verifyotp = async (req, res) => {
//   const { mobile, otp,walletId } = req.body;

//   if (otp == "123456") {
//     const findone = await User.findOne({ mobile: mobile });
//     const x = findone.userverified
//     console.log("X",x)
//     if(x == true){
//  console.log(x)

//  const today = moment().startOf('day'); // Get the current date without time
//       const expDate = moment(findone.expdate).startOf('day')


//  const token = jwt.sign(
//         {
//           userId: findone._id,
//         },
//         process.env.TOKEN_SECRET,
//         {
//           expiresIn: 86400000,
//         }
//       )
//       await User.findOneAndUpdate(
//         {
//           _id: findone._id,
//         },
//         { $set: { userverified: true } },
//         { new: true }).populate("planId")
//         .then((data) => {
//           res.header("auth-token",token).status(200).send({
//             status: "success",
//             token: token,
//             msg: "Welcome Back",
//             otpverified: true,
//             redirectto: "dashboard",
//             _id: data?._id,
//             userId: data._id,
//             exp_free_mem:data?.exp_free_mem,
//             start_date:data?.start_date,
//             expdate:data?.expdate,
//             planId :data?.planId
          
           
//           })
//         })
//     }else  {
//       const token = jwt.sign(
//         {
//           userId: findone._id,
//         },
//         process.env.TOKEN_SECRET,
//         {
//           expiresIn: 86400000,
//         }
//       )
//     await User.findOneAndUpdate(
//       {
//         _id: findone._id,
//       },
//       { $set: { userverified: true,walletId: findone._id } },
//       { new: true })
//       .then((data) => {
//        res.header("auth-token", token).status(200).send({
//             status: "success",
//             token:token,
//             msg: "Continue signup",
//             otpverified: true,
//             //userdata:userdata,
//             redirectto: "signupdetail",
//             walletId: data.walletId,
            
//           });
//         })
//     }  
  
// }else {
//   res.status(400).json({
//     status: false,
//     msg: "Incorrect otp",
//   });
// }
// }
 // const moment = require("moment"); // Import the 'moment' library to handle dates

 //const moment = require("moment");

 //const moment = require("moment");

// const moment = require("moment");

//  exports.verifyotp = async (req, res) => {
//    const { mobile, otp, walletId } = req.body;
 
//    if (otp == "123456") {
//      const findone = await User.findOne({ mobile: mobile });
//      const x = findone.userverified;
//      console.log("X", x);
 
//      if (x == true) {
//        console.log(x);
 
//        const todayDate = moment().format("DD-MM-YYYY");
//        console.log("todayDate", todayDate);
 
//        // Use moment with the specified date format to parse the expdate
//        const expDate = moment(findone.expdate, "DD-MM-YYYY", true); // Specify the date format and set strict mode to true
 
//        if (expDate.isValid() && expDate.isSame(todayDate, "day")) {
//         console.log("treuuu")
//          await User.findOneAndUpdate(
//            { _id: findone._id },
//            { $set: { userverified: true, exp_free_mem: "false" } },
//            { new: true }
//          ).populate("planId")
//          .then((data) => {
//            const token = jwt.sign(
//              {
//                userId: findone._id,
//              },
//              process.env.TOKEN_SECRET,
//              {
//                expiresIn: 86400000,
//              }
//            );
 
//            res.header("auth-token", token).status(200).send({
//              status: "success",
//              token: token,
//              msg: "Welcome Back",
//              otpverified: true,
//              redirectto: "dashboard",
//              _id: data?._id,
//              userId: data._id,
//              exp_free_mem: data?.exp_free_mem,
//              start_date: data?.start_date,
//              expdate: data?.expdate,
//              planId: data?.planId,
//            });
//          });
//        } else {
//         console.log("strrr")
//          const token = jwt.sign(
//            {
//              userId: findone._id,
//            },
//            process.env.TOKEN_SECRET,
//            {
//              expiresIn: 86400000,
//            }
//          );
 
//          await User.findOneAndUpdate(
//            { _id: findone._id },
//            { $set: { userverified: true } },
//            { new: true }
//          ).populate("planId")
//          .then((data) => {
//            res.header("auth-token", token).status(200).send({
//              status: "success",
//              token: token,
//              msg: "Welcome Back",
//              otpverified: true,
//              redirectto: "dashboard",
//              _id: data?._id,
//              userId: data._id,
//              exp_free_mem: data?.exp_free_mem,
//              start_date: data?.start_date,
//              expdate: data?.expdate,
//              planId: data?.planId,
//            });
//          });
//        }
//      } else {
//        // Rest of the code remains the same
//        // ...
//      }
//    } else {
//      res.status(400).json({
//        status: false,
//        msg: "Incorrect otp",
//      });
//    }
//  };
 
 
exports.verifyotp = async (req, res) => {
  const { mobile, otp, walletId ,fcmToken,expDate} = req.body;

  if (otp == "123456") {
    const findone = await User.findOne({ mobile: mobile });
    console.log("findone",findone)
    // const x = findone.userverified;
    // console.log("X", x);

    // if (x == true) {
    //   console.log(x);
     
      // Check if 'expdate' and current date are the same
      const todayDate = moment().format("DD-MM-YYYY");
      console.log("todayDate",todayDate);
      const expDate =findone.expdate  // Get the 'expdate' without time
console.log("expDDate",expDate)
      if (expDate ===todayDate ) {
        console.log("expDateeee",expDate)

        // If 'expdate' and current date are the same, set 'exp_free_mem' to false
        await User.findOneAndUpdate(
          { _id: findone._id },
          { $set: { userverified: true, exp_free_mem: "false" } },
          { new: true }
        ).populate("planId")
        .then((data) => {
          const token = jwt.sign(
            {
              userId: findone._id,
            },
            process.env.TOKEN_SECRET,
            {
              expiresIn: 86400000,
            }
          );

          res.send(200).send({
            status: "success",
            token: token,
            msg: "Welcome Back",
            otpverified: true,
            redirectto: "dashboard",
            _id: data?._id,
            userId: data._id,
            exp_free_mem: data?.exp_free_mem,
            start_date: data?.start_date,
            expdate: data?.expdate,
            planId: data?.planId,
          });
        });
      } else {
       // 'expdate' and current date are different, continue the regular flow

        const token = jwt.sign(
          {
            userId: findone._id,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 86400000,
          }
        );

        await User.findOneAndUpdate(
          { _id: findone._id },
          { $set: { userverified: true,fcmToken: fcmToken } },
          { new: true }
        ).populate("planId")
        .then((data) => {
          res.status(200).send({
            status: "success",
            token: token,
            msg: "Welcome Back",
            otpverified: true,
            redirectto: "dashboard",
            _id: data?._id,
            userId: data._id,
            exp_free_mem: data?.exp_free_mem,
            start_date: data?.start_date,
            expdate: data?.expdate,
            planId: data?.planId,
          });
        });
      }
   // }  
  } else {
    res.status(400).json({
      status: false,
      msg: "Incorrect otp",
    });
  }
};

exports.myWallet = async (req, res) => {
  const getdata = await User.findOne({_id:req.userId})
//   console.log(getdata)
 if(getdata){

//    let oldamt = getdata.amount
//    console.log("amout",oldamt)
  
//     currntbalance = parseInt(oldamt)+ parseInt(req.body.amount)
//    console.log("Result",currntbalance)
 

    
   // console.log(sum);
    //console.log(findone)
    res.status(200).json({
      status: true,
      msg: "success",
      data: getdata,
       // total: sum,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

   
exports.getuser = async (req, res) => {
  await User.find().sort({ createdAt: -1 })

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneuser = async (req, res) => {
 const findone = await User.findOne({ _id: req.userId}).populate("planId")
 let dd =new Date();
 var ddd = moment(dd).format('DD-MM-YYYY')
 console.log("ddd",ddd)

    let plan = findone.expdate
    console.log("plan",plan)

  if(ddd == plan ){
    console.log("true")
    let qur=  await User.findOneAndUpdate(
      { _id: req.userId },
      
      {$set: {exp_free_mem:"false"}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
      
      ) .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }else{
    console.log("false")
    res.status(200).json({
      status: true,
      message: "success",
      //count: data.length,
      data: findone,
    })
  }


   
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

exports.dltMyaccount = async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.ttlActiveuser = async (req, res) => {
  await User.countDocuments({status:"Active"}) 
   .then((data) => {
    res.status(200).json({
      status: true,
      data: data,
    });
  })
  .catch((error) => {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  });
};

//const mime = require('mime');
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



 