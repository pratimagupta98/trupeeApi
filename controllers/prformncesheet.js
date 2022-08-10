const PrformnceSheet = require("../models/prformncesheet");
const resp = require("../helpers/apiResponse");

exports.addper_Sheet = async (req, res) => {
  const { month,year,plan_price } = req.body;

  const newPrformnceSheet = new PrformnceSheet({
    month:month,
    year: year,
    plan_price:plan_price
  });
  
    newPrformnceSheet
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  
}


exports.getPerSheet = async (req, res) => {
    await PrformnceSheet.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getonePersheet = async (req, res) => {
    await PrformnceSheet.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editPersheet = async (req, res) => {
    await PrformnceSheet.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltPerSheet = async (req, res) => {
    await PrformnceSheet.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  