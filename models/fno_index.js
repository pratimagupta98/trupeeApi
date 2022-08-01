const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
     
    //     equity_script: [{
    //     type: String,
    //     default: ["SL", "PF", "", "canRead"],
    //   }],
    //['SL', 'PF', 'BUY','SELL',],
  equity_script:{  type:  String,},
      active_value:{
        type: Number, 
       },
       script_name:
        { type: mongoose.Schema.Types.ObjectId, ref: "script" },
       
       tip:{
        type : String,
       },
       call_type:{
        type: String, 
       },
       intraday: {
        type: String, 
       },
      //  ['BTST', 'Short Term', 'Intraday or BTST','Intraday or BTST','Intraday (Risky)','Intraday (Trailed)','Intraday (Re-entry)','Intraday (Re-entry- Trailed)','Intraday (Hero-Zero)'],
       SL:{
        type: Number, 
       },
       T1:{
        type: Number,
       },
       T2:{
        type: Number,
       },
       T3:{
        type: Number,
       },
      
       qty:{
        type: Number,
       },
       investment_amt:{
        type: Number,
       },
       qty_of_lots:{
        type : Number,
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("fnoindex", thisSchema);
