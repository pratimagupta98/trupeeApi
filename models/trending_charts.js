const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     title: {
        type: String,
      },
      desc: {
        type: String,
      },
   
      image:{
        type: Array,
        
      },
       chart_type:{
        type:String
       }
     // index chart,stock chart
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("trending_charts", thisSchema);
