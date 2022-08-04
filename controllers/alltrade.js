const Alltrade = require("../models/alltrade");
const resp = require("../helpers/apiResponse");

exports.addTrade= async (req, res) => {
    
    const {date,time, equity_script,script_name,active_value,call_type,SL,sl_type,T1,t1_type,T2,t2_type,T3,t3_type,T4,t4_type,qty,investment_amt,no_of_lots } = req.body;


  
  const newAlltrade = new Alltrade({
    date:date,
    time:time,
    equity_script: equity_script,
    script_name:script_name,
    active_value:active_value,
    call_type:call_type,
    SL:SL,
    sl_type:sl_type,
    T1:T1,
    t1_type:t1_type,
    T2:T2,
    t2_type:t2_type,
    T3:T3,
    t3_type:t3_type,
    T4:T4,
    t4_type:t4_type,
    qty:qty,
    investment_amt:investment_amt,
    no_of_lots:no_of_lots,
 
  });
 
    newAlltrade
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.tradelist = async (req, res) => {
    await Alltrade.find().populate("script_name")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_tradelist = async (req, res) => {
    await Alltrade.findOne({ _id: req.params.id }).populate("script_name")
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