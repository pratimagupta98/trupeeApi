const EquityScript = require("../models/fnoequity_script");
const resp = require("../helpers/apiResponse");

exports.addEquityScript = async (req, res) => {
  const { scriptName,status  } = req.body;

  const newEquityScript = new EquityScript({
    scriptName: scriptName,
    status:status
     
  });
  const findexist = await EquityScript.findOne({ scriptName:scriptName });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newEquityScript
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.getEquityScript = async (req, res) => {
    await EquityScript.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.dltEquityScript = async (req, res) => {
    await EquityScript.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  