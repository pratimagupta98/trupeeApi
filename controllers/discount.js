const Discount = require("../models/discount");
const resp = require("../helpers/apiResponse");

exports.add_discount= async (req, res) => {
  const { title,flat_price,percentage,code,startdate,expdate } = req.body;


  create_random_string(6);
  function create_random_string(string_length) {
    (random_string = ""),
      (characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }
  const newDiscount = new Discount({
    title: title,
    flat_price:flat_price,
    percentage:percentage,
    code :random_string,
    startdate:startdate,
    expdate:expdate
  });
  const findexist = await Discount.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newDiscount
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.discount_list = async (req, res) => {
    await Discount.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.viewone_discount = async (req, res) => {
    await Discount.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.edit_discount = async (req, res) => {
    await Discount.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.dlt_discount = async (req, res) => {
    await Discount.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };