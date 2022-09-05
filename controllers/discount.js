const Discount = require("../models/discount");
const resp = require("../helpers/apiResponse");
const PromoCode = require("../models/promoCode");

exports.add_discount= async (req, res) => {
  const { title,dis_type,dis_amt,plan,userid, code,startdate,expdate } = req.body;


  create_random_string(6);
  function create_random_string(string_length) {
    (random_string = ""),
      (characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }
  const newDiscount = new Discount({
    title: title,
    dis_type:dis_type,
    dis_amt:dis_amt,
    plan :plan,
    userid:userid,
    code :random_string,
    startdate:startdate,
    expdate:expdate
  });
  const findexist = await Discount.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newDiscount
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.discount_list = async (req, res) => {
    await Discount.find().populate("plan").populate("userid")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.viewone_discount = async (req, res) => {
    await Discount.findOne({ _id: req.params.id }).populate("plan").populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.edit_discount = async (req, res) => {
    await Discount.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.dlt_discount = async (req, res) => {
    await Discount.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.applyCode= async (req, res) => {
    const{code ,plan} = req.body


    const getdata = await Discount.findOne({$and :[{userid:req.userId},{code :req.body.code}]}).sort({ createdAt: -1,})
    console.log("####",getdata)
    if(getdata){

      const findexist = await PromoCode.findOne({ userid: req.userId });
      if (findexist) {
        resp.alreadyr(res);
      }else{
      const newPromoCode = new PromoCode({
        code:code,
        userid:req.userId,
        plan :plan
      })

      newPromoCode.save().then((data) => {
     res.status(200).json({
       status: true,
       msg: "success",
       data: data,
      
     });
   })
  
   .catch((error) => {
     res.status(400).json({
       status: false,
       msg: "error",
       error: error,
     });
   });
  }
     }else{
      res.status(200).json({
        status: true,
        msg: "Incorrect Code",
        error: "error",
      });
     }

  
}
  
exports.promoCode_list = async (req, res) => {
  await PromoCode.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
