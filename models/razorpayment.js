const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     userid: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      trim: true,
      },
       
      razorpay_payment_id:{
      type:String
    }
     
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("razorpay", thisSchema);
