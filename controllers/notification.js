const Notification = require("../models/notification");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
var FCM = require('fcm-node');
const path = require("path");

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
  try {
    const { title, desc, img } = req.body;

    const newNotification = new Notification({
      title: title,
      desc: desc,
    });

    const findexist = await Notification.findOne({ title: title });
    if (findexist) {
      resp.alreadyr(res);
    } else {
      if (req.files.img) {
        const alluploads = [];
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



const sendPushNotification = async (userid, message) => {
  try {
    console.log('USER ID:- ' + userid)
    console.log('message from admin :- ' + message)

    fs.readFile(path.join(__dirname, '../FireBaseConfig.json'), "utf8", async (err, jsonString) => {
      if (err) {
        console.log("Error Reading file from disk", err)
        return err;
      }
      try {
        const data = JSON.parse(jsonString)
        var serverkey = data.SERVER_KEY
        var fcm = new FCM(serverkey)
        var push_tokens = await push_notification.find({
          where: {
            user_id: userId
          }
        })
        var reg_ids = []
        push_tokens.forEach(token => {
          reg_ids.push(token.fcm_token)
        })
        if (reg_ids.length > 0) {
          var pushMessage = {
            registration_ids: reg_ids,
            content_available: true,
            mutable_content: true,
            notification: {
              body: message,
              icon: 'myicon',
              sound: 'sound'
            }
          }
          fcm.send(pushMessage, function (err, apiResponse) {
            if (err) {
              console.log('something has gone wrong!', err)
            } else {
              console.log('push notification sent', response)
            }
          })
        }
      } catch (err) {
        console.log("Error parsing JSON String", err)
      }
    })

  } catch (error) {
    console.log(error)
  }
}