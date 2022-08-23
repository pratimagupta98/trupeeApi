const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     pack_name: {
        type: String,
      },
      mrp_price: {
        type: Number,
      },
      des_price: {
        type: Number,
      },
      status:{
        type: String,
        default:"Deactive" //Deactive
      },
      desc:{
        type: String,
      }
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("plan", thisSchema);
