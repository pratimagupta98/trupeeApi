const FnoIndex = require("../models/fno_index");
const resp = require("../helpers/apiResponse");

exports.add_fnoIndex= async (req, res) => {
    
    const { equity_script,script_name,tip,active_value,call_type,intraday,SL,T1,T2,T3,qty,investment_amt,qty_of_lots } = req.body;


  
  const newFnoIndex = new FnoIndex({
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
     qty:qty,
    investment_amt:investment_amt,
    qty_of_lots:qty_of_lots,
 
  });
 
  newFnoIndex
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.fnoIndexlist = async (req, res) => {
    await FnoIndex.find().populate("script_name")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_fnoIndex = async (req, res) => {
    await FnoIndex.findOne({ _id: req.params.id }).populate("script_name")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.edit_fnoIndex = async (req, res) => {
    await FnoIndex.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.dlt_fnoIndex = async (req, res) => {
    await FnoIndex.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };