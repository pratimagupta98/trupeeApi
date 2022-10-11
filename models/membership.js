const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membershipplan = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      trim: true,
    },
    date: { type: String },
    transaction_id: {
      type: String,
      trim: true,
    },
    expdate: {
      type: String,
      trim: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan",
  //   trim: true,
    },
    refral_Code:{type: String},
    // amount: {
    //   type: Number,
    //   trim: true,
    //   default: null,
    // },
    amount: {
      type: Number,
     // default: 0,
    },
    type :{
      type:String
    },
    status:{
      type:String,
      default:"Active"
    },
    mem_status:{
      type:String,
      //default:"false"
    },
    razorpay_payment_id:{
      type:String
    },
    exp_free_mem:{
      type:String,
    default:"true"
    },
    expdate:{
      type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("membershipplan", membershipplan);
