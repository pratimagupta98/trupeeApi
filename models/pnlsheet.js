const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
      
      pnlimg:{
        type: Array,
      }
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("pnl", thisSchema);
