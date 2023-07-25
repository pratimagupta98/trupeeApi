const CashScript = require("../models/cash_script");
const resp = require("../helpers/apiResponse");

exports.addCashScript = async (req, res) => {
  const { scriptName, status } = req.body;

  const newCashScript = new CashScript({
    scriptName: scriptName,
    status: "Active"

  });
  const findexist = await CashScript.findOne({ scriptName: scriptName,
    status: "Active", });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newCashScript
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.getCashScript = async (req, res) => {
  await CashScript.find({ status: "Active" })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getoneCashScript = async (req, res) => {
  await CashScript.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.editCashScript = async (req, res) => {
  await CashScript

    .findOneAndUpdate(
      {
        _id: req.params.id,
        //  console.log(req.params._id);
      },
      {
        $set: req.body,
      },
      { new: true }
    )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

// exports.dltCashScript = async (req, res) => {
//   await CashScript.deleteOne({ _id: req.params.id })
//     .then((data) => resp.deleter(res, data))
//     .catch((error) => resp.errorr(res, error));
// };


exports.dltCashScript = async (req, res) => {
  await CashScript

    .findOneAndUpdate(
      {
        _id: req.params.id,
        //  console.log(req.params._id);
      },
      {
        $set: { status: "Deactive" },
      },
      { new: true }
    )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};