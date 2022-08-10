const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
      title:{
        type: String,
      },
      dis_type:{
        type: String, 
       },
       //flat,percentage
       dis_amt:{
        type:String
       },
       plan:{ type: Schema.Types.ObjectId, ref: "plan" },
       userid:{ type: Schema.Types.ObjectId, ref: "user" },
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
