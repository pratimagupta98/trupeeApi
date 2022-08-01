const Alltrade = require("../models/alltrade");
const resp = require("../helpers/apiResponse");

exports.addTrade= async (req, res) => {
    
    const { equity_script,script_name,active_value,call_type,intraday,SL,T1,T2,T3,T4,qty,investment_amt,qty_of_lots } = req.body;


  
  const newAlltrade = new Alltrade({
    equity_script: equity_script,
    script_name:script_name,
    tip:tip,
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
 
  });
 
    newAlltrade
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.tradelist = async (req, res) => {
    await Alltrade.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_tradelist = async (req, res) => {
    await Alltrade.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.edit_trade = async (req, res) => {
    await Alltrade.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.dlt_trade = async (req, res) => {
    await Alltrade.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };