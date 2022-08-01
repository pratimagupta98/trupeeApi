const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
     
    //     equity_script: [{
    //     type: String,
    //     default: ["SL", "PF", "", "canRead"],
    //   }],
    //['CE', 'PF', 'BUY','SELL',],
  equity_script:{  type:  String,},
      active_value:{
        type: Number, 
       },
       script_name:
        { type: mongoose.Schema.Types.ObjectId, ref: "script" },
       
       call_type:{
        type: String, 
       },
      //  ['intraday','BTST', 'Short Term', 'Intraday or BTST','Intraday or BTST','Intraday (Risky)','Intraday (Trailed)','Intraday (Re-entry)','Intraday (Re-entry- Trailed)','Intraday (Hero-Zero)'],
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
       T4:{
        type: Number,
       },
       qty:{
        type: Number,
       },
       investment_amt:{
        type: Number,
       },
       no_of_lots:{
        type : Number,
       },
       status: { type: String,
        default:"Active" },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("alltrade", thisSchema);
