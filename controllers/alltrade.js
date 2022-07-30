const Alltrade = require("../models/alltrade");
const resp = require("../helpers/apiResponse");

exports.addTrade= async (req, res) => {
    
    const { equity_script,active_value,call_type,intraday,SL,T1,T2,T3,T4,qty,investment_amt,qty_of_lots,script_name } = req.body;


  
  const newAlltrade = new Alltrade({
    equity_script: equity_script,
    active_value:active_value,
    call_type:call_type,
    intraday :intraday,
    SL:SL,
    T1:T1,
    T2:T2,
    T3:T3,
    T4:T4,
    qty:qty,
    investment_amt:investment_amt,
    qty_of_lots:qty_of_lots,
    script_name:script_name

  });
//   const findexist = await Discount.findOne({ title: title });
//   if (findexist) {
//     resp.alreadyr(res);
//   } else {
    newAlltrade
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
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