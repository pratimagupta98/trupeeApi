const Feedback = require("../models/feedback");
const resp = require("../helpers/apiResponse");

exports.addFeedback = async (req, res) => {
  const { userid,title,desc } = req.body;

  const newFeedback = new Feedback({
    userid: userid,
    title:title,
    desc:desc
  });
  const findexist = await Feedback.findOne({   $and: [{ userid: userid }, { title: title}],});
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newFeedback
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
  