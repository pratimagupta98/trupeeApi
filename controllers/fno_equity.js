const FnoEquity = require("../models/fno_equity");
const resp = require("../helpers/apiResponse");

exports.add_fnoEquity   = async (req, res) => {
    
    const { equity_script,script_name,active_value,call_type,SL,T1,T2,T3,T4,qty,investment_amt,no_of_lots } = req.body;


  
  const newFnoEquity = new FnoEquity({
    equity_script: equity_script,
    script_name:script_name,
    active_value:active_value,
    call_type:call_type,
    SL:SL,
    T1:T1,
    T2:T2,
    T3:T3,
    T4:T4,
    qty:qty,
    investment_amt:investment_amt,
    no_of_lots:no_of_lots,
 
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