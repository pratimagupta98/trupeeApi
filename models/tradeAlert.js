const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       type:{
        type: String, 
       },
          
       script_name:{
        type: String, 
       },
       trade_alert:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("tradeAlert", thisSchema);
