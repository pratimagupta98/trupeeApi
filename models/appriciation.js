const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
      userid:{ type: Schema.Types.ObjectId, ref: "user" },
    
     
      amt:{
        type: Number, 
       },
       razorpay_payment_id:{
        type:String
      },
      desc:{
        type: String, 
      },
       
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("appriciation", thisSchema);
