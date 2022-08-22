const PreminumSrvc = require("../models/prmiumSrvc.js");
const resp = require("../helpers/apiResponse");

exports.addPrmiumSrvc = async (req, res) => {
  const { title, planId,desc } = req.body;

  const newPreminumSrvc = new PreminumSrvc({
    title: title,
    planId:planId,
    desc:desc
  });
//   const findexist = await Membership.findOne({ plantitle: plantitle });
//   if (findexist) {
//     resp.alreadyr(res);
//   } else {
    newPreminumSrvc
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }


// exports.editplan = async (req, res) => {
//   await Plan.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     { $set: req.body },
//     { new: true }
//   )
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

// exports.viewoneplan = async (req, res) => {
//   await Plan.findOne({ _id: req.params.id })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

exports.serviceslist = async (req, res) => {
  await PreminumSrvc.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

// exports.deleteplan = async (req, res) => {
//   await Plan.deleteOne({ _id: req.params.id })
//     .then((data) => resp.deleter(res, data))
//     .catch((error) => resp.errorr(res, error));
// };
