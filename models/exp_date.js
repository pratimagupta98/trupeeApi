const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
        expDate:{
        type: String,
      },
       
      status: {
        type: String,
        default:"Deactive"
    },

      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("exp_date", thisSchema);
