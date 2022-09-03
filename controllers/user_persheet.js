const UserpSheet = require("../models/user_persheet");
const resp = require("../helpers/apiResponse");

exports.ad_user_persheet= async (req, res) => {
  const { plan,email} = req.body;

  const newUserpSheet = new UserpSheet({
    plan:plan,
    userId:req.userId,
    email:email
   });
 
   newUserpSheet
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
   
}


exports.get_userPerSheet= async (req, res) => {
    await UserpSheet.find().populate("userId").populate("plan")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_userPersheet = async (req, res) => {
    await UserpSheet.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_userPersheet = async (req, res) => {
    await UserpSheet.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_userPerSheet = async (req, res) => {
    await UserpSheet.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
             