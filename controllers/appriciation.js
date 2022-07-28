const Appriciation = require("../models/appriciation");
const resp = require("../helpers/apiResponse");

exports.add_appriciation = async (req, res) => {
  const { userid, amt } = req.body;

  const newAppriciation = new Appriciation({
    userid: userid,
    amt: amt,
   
  });
//   const findexist = await Membership.findOne({ plantitle: plantitle });
//   if (findexist) {
//     resp.alreadyr(res);
//   } else {
    newAppriciation
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }


exports.editMembership = async (req, res) => {
  await Appriciation.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneplan = async (req, res) => {
  await Appriciation.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.appriciation_list = async (req, res) => {
  await Appriciation.find()
    .sort({ sortorder: 1 }).populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteplan = async (req, res) => {
  await Plan.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
