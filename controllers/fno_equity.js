const FnoEquity = require("../models/fno_equity");
const resp = require("../helpers/apiResponse");

exports.add_fnoEquity   = async (req, res) => {
    
    const {date,time, equity_script,script_name,active_value,active_value2,call_type,SL,sl_type,T1,t1_type,T2,t2_type,T3,t3_type,T4,t4_typet,qty,investment_amt,no_of_lots,pl_type,profit_loss } = req.body;


  
  const newFnoEquity = new FnoEquity({
    date:date,
    time:time,
    equity_script: equity_script,
    script_name:script_name,
    active_value:active_value,
    active_value2:active_value2,
    call_type:call_type,
    SL:SL,
    sl_type:sl_type,
    T1:T1,
    t1_type:t1_type,
    T2:T2,
    t2_type :t2_type,
    T3:T3,
    t3_type:t3_type,
    T4:T4,
    t4_typet:t4_typet,
    
    qty:qty,
    investment_amt:investment_amt,
    no_of_lots:no_of_lots,
    pl_type:pl_type,
    profit_loss:profit_loss,
   
  });
 
  newFnoEquity
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.fnoEquity_list = async (req, res) => {
    await FnoEquity.find().populate("script_name")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_fnoEquity = async (req, res) => {
    await FnoEquity.findOne({ _id: req.params.id }).populate("script_name")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.edit_fnoEquity = async (req, res) => {
    await FnoEquity.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.dlt_fnoEquity = async (req, res) => {
    await FnoEquity.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };