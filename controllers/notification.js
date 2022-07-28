const Notification = require("../models/notification");
const resp = require("../helpers/apiResponse");

exports.add_notification = async (req, res) => {
  const { title,desc} = req.body;

  const newNotification = new Notification({
    title: title,
    desc:desc,
   });
  const findexist = await Notification.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
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
  