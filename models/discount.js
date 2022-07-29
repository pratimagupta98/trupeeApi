const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
      title:{
        type: String,
      },
      flat_price:{
        type: Number, 
       },
       percentage:{
        type:String
       },
       code:{
        type :String
       },
       startdate:{
        type:String
       },
       expdate:{
        type:String 
       }

       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("discount", thisSchema);
