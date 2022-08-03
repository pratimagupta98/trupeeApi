const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
      equityScript:{
        type: String,
      },
      active_value:{
        type: Number, 
       },
       call_type:{
        type:String
       },
       qty:{
        type :Number
       },
       investment_amt:{
        type:Number
       },
       no_of_lots:{
        type:Number 
       },
       script_name:
        { type: mongoose.Schema.Types.ObjectId, ref: "script" },
        av2:{
          type:Number
        },
trl:{
  type:Number
},
t1:{
  type:Number
}
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("bankNifty", thisSchema);
