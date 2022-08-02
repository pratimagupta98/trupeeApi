const MemContent = require("../models/mem_content");
const resp = require("../helpers/apiResponse");

exports.add_memeContent= async (req, res) => {
  const { title,desc} = req.body;

  const newMemContent = new MemContent({
    title:title,
    desc:desc,
   });
  const findexist = await MemContent.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newMemContent
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.getContent = async (req, res) => {
    await MemContent.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_content = async (req, res) => {
    await MemContent.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_content = async (req, res) => {
    await MemContent.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_content = async (req, res) => {
    await MemContent.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  