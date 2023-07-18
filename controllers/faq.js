const Faq = require("../models/faq");
const resp = require("../helpers/apiResponse");

exports.addFAQ = async (req, res) => {
  const { title, desc } = req.body;

  const newFaq = new Faq({
    title: title,
    desc: desc
  });
  const findexist = await Faq.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newFaq
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.faq_list = async (req, res) => {
  await Faq.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltFaq = async (req, res) => {
  await Faq.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


 
exports.getoneFaq = async (req, res) => {
  await Faq.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.edit_faq = async (req, res) => {
  await Faq.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};