const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
    //['CE', 'PF', 'BUY','SELL',],
    script_type: { type: String, },
    active_value: {
      type: Number,
    },
    active_value2: {
      type: Number,
    },
    fnoindex_scrpt_name:
     { type: mongoose.Schema.Types.ObjectId, ref: "fno_script" },
    fnoequty_scrpt_name:
    { type: mongoose.Schema.Types.ObjectId, ref: "equity_script" },
    cash_scrpt_name:
    { type: mongoose.Schema.Types.ObjectId, ref: "cashScript" },
    call_type: {
      type: String,
    },

    //  ['BTST', 'Short Term', 'Intraday or BTST','Intraday or BTST','Intraday (Risky)','Intraday (Trailed)','Intraday (Re-entry)','Intraday (Re-entry- Trailed)','Intraday (Hero-Zero)'],
    SL: {
      type: Number,
    },
    sl_type: { type: String,
    //  default: "false"},
    },
    T1: {
      type: Number,
    },
    t1_type: {
      type: String,
     // default: "false"
    },
    T2: {
      type: Number,
    },
    t2_type: {
      type: String,
      //default: "false"
    },
    T3: {
      type: Number,
    },
    t3_type: {
      type: String,
     // default: "false"
    },
    T4: {
      type: Number,
    },
    t4_type: {
      type: String,
     // default: "false"
    },
    t5: {
      type: String,
    },
    t5_type: {
      type: String,
     // default: "false"
    },
    trl: {
      type: Number,
    },
    trl_type:{
      type: String,
     // default: "false"
    },
    qty: {
      type: Number,
    },
    investment_amt: {
      type: Number,
    },
    no_of_lots: {
      type: Number,
    },
    status: {
      type: String,
     // default: "NA"
    },
    tradeStatus :{
      type: String,
      //Closed
    },
    trade_type: {
      type: String
    },
    loss: {
      type: Number,
       
    },
    pl:{
      type: Number,
     // default: 0
    },
    pl_per: {
      type: Number,
      //default: 0
      
    },
    profit: {
      type: Number
    },
    profitprr: {
      type: Number
    },
    expiryDate: 
      { type: mongoose.Schema.Types.ObjectId, ref: "exp_date" },
    
type :{
  type: String,
 // required:true
  //Fno,Equity,Cash
},
FT1:{
  type: Number,
},
FT1_type :{
  type: String,
//  default: "false"
},
FT2:{
  type: Number,
},
FT2_type:{
  type: String,
  //default: "false"
},
FT3:{
  type: Number,
},
FT3_type:{
  type: String,
 // default: "false"
},
FT5:{
  type: String,
},
FT5_type:{
  type: String,
 // default: "false"
},
title:{
  type: String,
},
desc:{
  type: String,
},
img:{
type :Array
},
noti_status:{
  type: String,
 //Active
},
tradeId:{
   type: Schema.Types.ObjectId, ref: "alltrade" 
},
cstmMsg:{
  type: String,
}
  },



  { timestamps: true }
);




  module.exports = mongoose.model("tradehistory", thisSchema);
