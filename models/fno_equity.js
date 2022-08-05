const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
      date :{
        type: String, 
      },
      time:{
        type: String, 
      },
     
  equity_script:{  type:  String,},
     //['CE', 'PF', 'BUY','SELL',],
      active_value:{
        type: Number, 
       },
       active_value2:{
        type:Number
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
       sl_type:{
        type: String,
      default: false
       },
       T1:{
        type: Number,
       },
       t1_type:{
        type: String,
      default: false
       },
       T2:{
        type: Number,
       },
       t2_type:{
        type: String,
        default: false
       },
       T2:{
        type: Number,
       },
       t2_type:{
        type: String,
        default: false
       },
       T3:{
        type: Number,
       },
       t3_type:{
        type: false
       },
      
       T4:{
        type: Number,
       },
       t4_type:{
        type: String,
        default: false
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
        pl_type:{
          type: String,
        },  //Profit , Loss
        profit_loss:{
          type : String,
        },
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("fnoEquity", thisSchema);