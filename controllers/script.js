const Script = require("../models/script");
const resp = require("../helpers/apiResponse");

exports.addScript = async (req, res) => {
  const { script_name,script_type,status } = req.body;

  const newScript = new Script({
    script_name: script_name,
    script_type:script_type,
    status:status
  });
  const findexist = await Script.findOne({ script_type: script_type });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newScript
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.getScript = async (req, res) => {
    await Script.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_script = async (req, res) => {
    await Script.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editScript = async (req, res) => {
    await Script.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.deletescript = async (req, res) => {
    await Script.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  