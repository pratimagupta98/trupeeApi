const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
      
      pnlimg:{
        type: Array,
      },
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      }
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("pnl", thisSchema);
