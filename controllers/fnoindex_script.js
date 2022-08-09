const FnoScript = require("../models/fnoindex_script");
const resp = require("../helpers/apiResponse");

exports.addFeedback = async (req, res) => {
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


exports.getFeedback = async (req, res) => {
    await Feedback.find()
      .sort({ sortorder: 1 }).populate("userid").populate("script_type")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.dltFeedback = async (req, res) => {
    await Feedback.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  