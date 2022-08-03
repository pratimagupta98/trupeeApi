const Nifty = require("../models/nifty");
const resp = require("../helpers/apiResponse");

exports.addNifty = async (req, res) => {
  const { equityScript,active_value,call_type,qty ,investment_amt,no_of_lots,script_name} = req.body;

  const newNifty = new Nifty({
    equityScript: equityScript,
    active_value:active_value,
    call_type:call_type,
    qty:qty,
    investment_amt:investment_amt,
    no_of_lots:no_of_lots,
    script_name:script_name

  });
 
    newNifty
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.getNifty = async (req, res) => {
    await Nifty.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.dltNifty= async (req, res) => {
    await Nifty.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  