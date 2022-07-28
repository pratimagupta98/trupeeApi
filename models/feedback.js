const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
      userid:{ type: Schema.Types.ObjectId, ref: "user" },
      script_type: 
       { type: Schema.Types.ObjectId, ref: "script" },
     
      desc:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("feedback", thisSchema);
