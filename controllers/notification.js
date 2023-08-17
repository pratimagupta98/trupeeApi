const Notification = require("../models/notification");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
var FCM = require('fcm-node');
const path = require("path");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// exports.add_notification = async (req, res) => {
//   try {
//     const { title, desc, img, emoji } = req.body;

//     const newNotification = new Notification({
//       title: title,
//       desc: desc,
//       emoji: emoji

//     });

//     const findexist = await Notification.findOne({ title: title });
//     if (findexist) {
//       resp.alreadyr(res);
//     } else {
//       if (req.files.img) {
//         const alluploads = [];
//         for (let i = 0; i < req.files.img.length; i++) {
//           const resp = await cloudinary.uploader.upload(
//             req.files.img[i].path,
//             { use_filename: true, unique_filename: false }
//           );
//           fs.unlinkSync(req.files.img[i].path);
//           alluploads.push(resp.secure_url);
//         }
//         newNotification.img = alluploads;
//       }

//       newNotification
//         .save()
//         .then((data) => resp.successr(res, data))
//         .catch((error) => resp.errorr(res, error));
//     }
//   } catch (error) {
//     resp.errorr(res, error);
//   }
// };

// Assuming you have the 'sendPushNotification' function defined as shown in the previous code

exports.add_notification = async (req, res) => {
  try {
    const { title, desc, img, emoji } = req.body;

    const newNotification = new Notification({
      title: title,
      desc: desc,
      emoji: emoji,
    });

    const findexist = await Notification.findOne({ title: title });
    if (findexist) {
      resp.alreadyr(res);
    } else {
      if (req.files.img) {
        const alluploads = [];
        for (let i = 0; i < req.files.img.length; i++) {
          const resp = await cloudinary.uploader.upload(req.files.img[i].path, {
            use_filename: true,
            unique_filename: false,
          });
          fs.unlinkSync(req.files.img[i].path);
          alluploads.push(resp.secure_url);
        }
        newNotification.img = alluploads;
      }

      // Save the new notification
      newNotification
        .save()
        .then(async (data) => {
          // Send the push notification to all devices after saving the notification
          try {
            var serverKey = 'AAAAYmnAnfo:APA91bHuykyJnwz4hTITPWwChdMdS96e-cvmoDOtVIBfU_ZGVzarrrflOvkrunjvI41Bl_IUw-G_vAJd9UbFKLrh0JtBKrvVSTnieu2Ae4Xtt91Cl0ygN8NYgDA5cwo7HIlwXDqoHz1_';
            var fcm = new FCM(serverKey);

            const usersWithTokens = await User.find({
              fcmToken: { $exists: true, $ne: null },
            });

            const userTokens = usersWithTokens.map((user) => user.fcmToken);

            for (const token of userTokens) {
              var message = {
                to: token,
                notification: {
                  title: 'Trupee Notification',
                  body: 'hello trupee',
                },
                data: {
                  title: 'ok testing',
                  body:data
                   // '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
                },
              };

              fcm.send(message, function (err, response) {
                if (err) {
                  console.log('Something has gone wrong!' + err);
                  console.log('Response: ' + response);
                } else {
                  console.log('Successfully sent with response: ', response);
                }
              });
            }

            // Return a response to the client (optional)
            resp.successr(res, data);
          } catch (error) {
            resp.errorr(res, error);
          }
        })
        .catch((error) => resp.errorr(res, error));
    }
  } catch (error) {
    resp.errorr(res, error);
  }
};

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


// exports.edit_notification = async (req, res) => {
//   await Notification.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     { $set: req.body },
//     { new: true }
//   )
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

exports.edit_notification = async (req, res) => {
  const { title, desc, img, emoji } = req.body;

  data = {};
  if (title) {
    data.title = title;
  }
  if (desc) {
    data.desc = desc;
  }
  if (emoji) {
    data.emoji = emoji;
  }


  if (req.files) {
    if (req.files.img) {
      alluploads = [];
      for (let i = 0; i < req.files.img.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.img[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.img[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.img = alluploads;
    }
  }
  await Notification.findOneAndUpdate(
    {
      _id: req.params.id,
      //  console.log(req.params._id);
    },
    {
      $set: data,
    },
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

const push_notification = require("../models/notification");

//const FCM = require('fcm-node');
//const util = require('util'); // Import the 'util' module
//const push_notification = require('./path/to/push_notification_module');

// exports.sendPushNotification = async (userid, message) => {
//   const SERVER_KEY = 'AAAAYmnAnfo:APA91bHuykyJnwz4hTITPWwChdMdS96e-cvmoDOtVIBfU_ZGVzarrrflOvkrunjvI41Bl_IUw-G_vAJd9UbFKLrh0JtBKrvVSTnieu2Ae4Xtt91Cl0ygN8NYgDA5cwo7HIlwXDqoHz1_';
//   const push_tokens = 'eL1VACrJRwCN0SgIHjmbms:APA91bHMy_6Y7MFIfned1rfq3c551AmTYLD0LOxfBkveAV7PPhAn2WoLRqg0z0CUYo3UdqLXXsghXhTK8cxlnlkgVBvU9QkbrUCuyHwieSCjg3w7S59YUpyy5MKf5EiIJHy7z7mfgTOI';

//   try {
//     console.log('USER ID:- ' + userid);
//     console.log('message from admin :- ' + message);

//     fs.readFile(path.join(__dirname, '../FireBaseConfig.json'), "utf8", async (err, jsonString) => {
//       if (err) {
//         console.log("Error Reading file from disk", err);
//         return err;
//       }
//       try {
//         const data = JSON.parse(jsonString);
//         const serverkey = data.SERVER_KEY;
//         const fcm = new FCM(serverkey);
//         const pushTokens = await push_notification.find({
//           where: {
//             user_id: userid
//           }
//         });
//         const regIds = [];
//         pushTokens.forEach(token => {
//           regIds.push(token.fcm_token);
//         });
//         if (regIds.length > 0) {
//           const pushMessage = {
//             registration_ids: regIds,
//             content_available: true,
//             mutable_content: true,
//             notification: {
//               body: message,
//               icon: 'myicon',
//               sound: 'sound'
//             }
//           };
//           fcm.send(pushMessage, function (err, apiResponse) {
//             if (err) {
//               console.log('something has gone wrong!', err);
//             } else {
//               // Use util.inspect to handle circular references
//               console.log('push notification sent', util.inspect(apiResponse, { showHidden: false, depth: null }));
//             }
//           });
//         }
//       } catch (err) {
//         console.log("Error parsing JSON String", err);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };



const admin = require('firebase-admin');
const { response } = require("express");


// Endpoint to send push notification
// exports.sendPushNotification = async (req, res) => {



//   var serverKey = 'AAAAYmnAnfo:APA91bHuykyJnwz4hTITPWwChdMdS96e-cvmoDOtVIBfU_ZGVzarrrflOvkrunjvI41Bl_IUw-G_vAJd9UbFKLrh0JtBKrvVSTnieu2Ae4Xtt91Cl0ygN8NYgDA5cwo7HIlwXDqoHz1_';
//   var fcm = new FCM(serverKey);

//   var message = {
//     to: 'eL1VACrJRwCN0SgIHjmbms:APA91bHMy_6Y7MFIfned1rfq3c551AmTYLD0LOxfBkveAV7PPhAn2WoLRqg0z0CUYo3UdqLXXsghXhTK8cxlnlkgVBvU9QkbrUCuyHwieSCjg3w7S59YUpyy5MKf5EiIJHy7z7mfgTOI',
//     notification: {
//       title: 'TrupeeNotification',
//       body: '{"Message from Trupee"}',
//     },

//     data: { //you can send only notification or only data(or include both)
//       title: 'ok testing',
//       body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
//     }

//   };

//   fcm.send(message, function (err, response) {
//     if (err) {
//       console.log("Something has gone wrong!" + err);
//       console.log("Respponse:! " + response);
//     } else {
//       // showToast("Successfully sent with response");
//       console.log("Successfully sent with response: ", response);
//     }

//   });
// };const FCM = require('fcm-node'); // Assuming you've already installed the fcm-node package
//@@@@@@@@@
// exports.sendPushNotification = async (req, res) => {
//   var serverKey = 'AAAAYmnAnfo:APA91bHuykyJnwz4hTITPWwChdMdS96e-cvmoDOtVIBfU_ZGVzarrrflOvkrunjvI41Bl_IUw-G_vAJd9UbFKLrh0JtBKrvVSTnieu2Ae4Xtt91Cl0ygN8NYgDA5cwo7HIlwXDqoHz1_';
//   var fcm = new FCM(serverKey);

//   var message = {
//     // Change "to" to the topic name
//     to: '',
//     notification: {
//       title: 'TrupeeNotification',
//       body: 'Message from Trupee',
//     },
//     data: { 
//       title: 'ok testing',
//       body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
//     }
//   };

//   fcm.send(message, function (err, response) {
//     if (err) {
//       console.log("Something has gone wrong!" + err);
//       console.log("Response: " + response);
//     } else {
//       console.log("Successfully sent with response: ", response);
//     }
//   });
// };



//@@@@@@@@@@@@@@@
//  const SERVER_KEY='AAAAYmnAnfo:APA91bHuykyJnwz4hTITPWwChdMdS96e-cvmoDOtVIBfU_ZGVzarrrflOvkrunjvI41Bl_IUw-G_vAJd9UbFKLrh0JtBKrvVSTnieu2Ae4Xtt91Cl0ygN8NYgDA5cwo7HIlwXDqoHz1_'
// exports.sendPushNotification = async(req,res)=>{
//   try{
// let fcm = new FCM(SERVER_KEY) 


// let message={
//   to:'/topics/' + req.body.topic,
//   notification:{
//     title:req.body.title,
//     body:req.body.body,
//     'click_action':"FCM_PLUGIN_ACTIVITY",
//     "icon":"fcm_push_icon"
//   }
// }
// fcm.send(message,(err,response)=>{
//   if(err){
//     res.json(err)
//   }else{
//     res.json(response)
//   }
// })

//   }catch(error){

//   }
// }

//

//


// exports.sendPushNotification = async (req, res) => {
//   var serverKey = 'AAAAYmnAnfo:APA91bHuykyJnwz4hTITPWwChdMdS96e-cvmoDOtVIBfU_ZGVzarrrflOvkrunjvI41Bl_IUw-G_vAJd9UbFKLrh0JtBKrvVSTnieu2Ae4Xtt91Cl0ygN8NYgDA5cwo7HIlwXDqoHz1_'; // Replace with your FCM server key
//   var fcm = new FCM(serverKey);

//   try {
//     // Fetch all users from the database who have a valid FCM token
//     const usersWithTokens = await User.find({ fcmToken: { $exists: true, $ne: null } });
//     console.log("usersWithTokens", usersWithTokens)
//     // Extract the FCM tokens from the users and put them in an array
//     const userTokens = usersWithTokens.map((user) => user.fcmToken);

//     // Send notifications to each device token
//     for (const token of userTokens) {
//       var message = {
//         to: token,
//         notification: {
//           title: 'TrupeeNotification',
//           body: 'Message from Trupee',
//         },
//         data: {
//           title: 'ok testing',
//           body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
//         },
//       };

//       fcm.send(message, function (err, response) {
//         if (err) {
//           console.log("Something has gone wrong!" + err);
//           console.log("Response: " + response);
//         } else {
//           console.log("Successfully sent with response: ", response);
//         }
//       });
//     }

//     // Return a response to the client (optional)
//     res.send('Notifications sent to all devices.');
//   } catch (error) {
//     console.error("Error fetching user tokens:", error);
//     // Handle the error and return an appropriate response
//     res.status(500).json({ error: 'Error fetching user tokens.' });
//   }
// };
exports.sendPushNotification = async (req, res) => {



  var serverKey = 'AAAAYmnAnfo:APA91bHuykyJnwz4hTITPWwChdMdS96e-cvmoDOtVIBfU_ZGVzarrrflOvkrunjvI41Bl_IUw-G_vAJd9UbFKLrh0JtBKrvVSTnieu2Ae4Xtt91Cl0ygN8NYgDA5cwo7HIlwXDqoHz1_';
  var fcm = new FCM(serverKey);

  var message = {
    to: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRkZWNmNDMwZmIwNjE5YzlmZjlmYTQiLCJpYXQiOjE2OTIyNjU3NDUsImV4cCI6MTc3ODY2NTc0NX0.GGtyaP1sjNBpV_p8uCl2UmqMjexWMBrSZHH4TjnUvIw',
    notification: {
      title: 'TrupeeNotification',
      body: '{"Message from Trupee"}',
    },

    data: { //you can send only notification or only data(or include both)
      title: 'ok testing',
      body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
    }

  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!" + err);
      console.log("Respponse:! " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("Successfully sent with response: ", response);
    }

  });
};
