const Razorpay = require("../models/razorpayment");
const resp = require("../helpers/apiResponse");

exports.razorPayment= async (req, res) => {
  const {  razorpay_payment_id } = req.body;

  const newRazorpay = new Razorpay({
    razorpay_payment_id: razorpay_payment_id,
    userid:req.userId,
     
  });
  
  newRazorpay
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
 


exports.getpayment = async (req, res) => {
    await Razorpay.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  