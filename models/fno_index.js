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
     
    //     equity_script: [{
    //     type: String,
    //     default: ["SL", "PF", "", "canRead"],
    //   }],
    //['CE', 'PF', 'BUY','SELL',],
  equity_script:{  type:  String,},
      active_value:{
        type: Number, 
       },
       active_value2:{
        type: Number, 
       },
       script_name:
        { type: mongoose.Schema.Types.ObjectId, ref: "script" },
       
     
       call_type:{
        type: String, 
       },
     
      //  ['BTST', 'Short Term', 'Intraday or BTST','Intraday or BTST','Intraday (Risky)','Intraday (Trailed)','Intraday (Re-entry)','Intraday (Re-entry- Trailed)','Intraday (Hero-Zero)'],
       SL:{
        type: Number, 
       },
       sl_type: {type: Number},
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
       T3:{
        type: Number,
       },
       t3_type:{
        type: String,
      default: false
       },
      trl:{
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
    
      pl_type:{
        type: String,
      },
      profit_loss:{
        type : Number,
      },
      trade_type:{
        type : String
      },

    },

     
    { timestamps: true }
  );


  module.exports = mongoose.model("fnoindex", thisSchema);
