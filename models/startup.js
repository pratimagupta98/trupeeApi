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
      video_link:{
        type: Array,
      }
     
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("startup", thisSchema);
