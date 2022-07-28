const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     script_name: {
        type: String,
      },
      script_type: {
        type: String,
      },
   
      status:{
        type: String,
        default:"Active" //Deactive
      },
     
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("script", thisSchema);
