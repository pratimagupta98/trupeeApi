const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
        month: {
        type: String,
      },
      year: {
        type: String,
      },
      plan_price: {
        type: String,
      }
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("perSheet", thisSchema);
