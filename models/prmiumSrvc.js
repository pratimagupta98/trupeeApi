const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     title: {
        type: String,
      },
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plan",
      },
     
      desc:{
        type: String,
      }
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("premiumService", thisSchema);
