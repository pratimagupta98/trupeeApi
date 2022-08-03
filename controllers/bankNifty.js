const BankNifty = require("../models/bankNifty");
const resp = require("../helpers/apiResponse");

exports.addBankNifty = async (req, res) => {
  const { equityScript,active_value,call_type,qty ,investment_amt,no_of_lots,script_name} = req.body;

  const newBankNifty = new BankNifty({
    equityScript: equityScript,
    active_value:active_value,
    call_type:call_type,
    qty:qty,
    investment_amt:investment_amt,
    no_of_lots:no_of_lots,
    script_name:script_name

  });
 
    newBankNifty
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.getBankNifty = async (req, res) => {
    await Feedback.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.dltBankNifty= async (req, res) => {
    await Feedback.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  