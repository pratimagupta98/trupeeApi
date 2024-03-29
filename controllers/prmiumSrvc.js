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


exports.editService= async (req, res) => {
  await PreminumSrvc.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneService = async (req, res) => {
  await PreminumSrvc.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.serviceslist = async (req, res) => {
  await PreminumSrvc.find().populate("planId")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
 exports.dltPsrvc = async (req, res) => {
  await PreminumSrvc.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
