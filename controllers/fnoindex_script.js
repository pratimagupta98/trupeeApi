const FnoScript = require("../models/fnoindex_script");
const resp = require("../helpers/apiResponse");

exports.addFnoScript = async (req, res) => {
  const { scriptName,status  } = req.body;

  const newFnoScript = new FnoScript({
    scriptName: scriptName,
    status:status
     
  });
  const findexist = await FnoScript.findOne({ scriptName:scriptName });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newFnoScript
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.getFnoScript = async (req, res) => {
    await FnoScript.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneFnoScript = async (req, res) => {
    await FnoScript.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.editFnoScript = async (req, res) => {    
    await FnoScript
  
      .findOneAndUpdate(
        {
          _id: req.params.id,
          //  console.log(req.params._id);
        },
        {
          $set: req.body,
        },
        { new: true }
      )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.dltFnoScript = async (req, res) => {
    await FnoScript.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  