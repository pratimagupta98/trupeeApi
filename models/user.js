const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    // userimg: {
    //   type: Array,
    // },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number
    },
    password: {
      type: String,
    },
    cnfmPassword: {
      type: String,
    },

    // address:{
    //   type: String,
    // },
    // city:{
    //   type: String, 
    //  },
    otp: { type: String },
    userverified: { type: Boolean, default: false },
    refral_Code: {
      type: String,
    },
    walletId: {
      type: String
    },
    amount: {
      type: Number,
      default: 0,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan",
    },
    des_price: {
      type: String,

    },

    status: {
      type: String,
      default: "Deactive",
    },
    start_date: {
      type: String,
    },
    expdate: {
      type: String,
    },
    pack_name: {
      type: String,
    },
    exp_free_mem: {
      type: String
    },
    fcmToken: {
      type: String,
      default: ""
    }
    //  status:{
    //   type: String,
    //   default:"Deactive"
    //  }
  },


  { timestamps: true }
);


module.exports = mongoose.model("user", UserSchema);
