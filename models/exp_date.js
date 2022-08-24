const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
        expDate:{
        type: String,
      },
       
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("exp_date", thisSchema);
