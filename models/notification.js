const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
      title:{ type: String },
      desc:{
        type: String, 
       },
       img:{
        type: Array, 
       },
       emoji:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("notification", thisSchema);

//alltrade notification