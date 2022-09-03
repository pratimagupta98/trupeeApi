const ExpDate = require("../models/exp_date");
const resp = require("../helpers/apiResponse");

exports.addExpDate = async (req, res) => {
  const { expDate } = req.body;

  const newExpDate = new ExpDate({
    expDate: expDate,
    
  });
  const findexist = await ExpDate.findOne({ expDate: expDate });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newExpDate
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.datelist = async (req, res) => {
    await ExpDate.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getoneexpDate = async (req, res) => {
    await ExpDate.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltDate = async (req, res) => {
    await ExpDate.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.editDate = async (req, res) => {
    await ExpDate.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  