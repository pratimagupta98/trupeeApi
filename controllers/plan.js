const Plan = require("../models/plan");
const resp = require("../helpers/apiResponse");

exports.addPlan = async (req, res) => {
  const { pack_name, mrp_price,des_price,status,desc } = req.body;

  const newPlan = new Plan({
    pack_name: pack_name,
    mrp_price: mrp_price,
    des_price:des_price,
    status:status,
    desc:desc
  });
//   const findexist = await Membership.findOne({ plantitle: plantitle });
//   if (findexist) {
//     resp.alreadyr(res);
//   } else {
  newPlan
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }


exports.editplan = async (req, res) => {
  await Plan.findOneAndUpdate(
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
  await Plan.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.plan_list = async (req, res) => {
  await Plan.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteplan = async (req, res) => {
  await Plan.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
