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
      default: false },
    T1: {
      type: Number,
    },
    t1_type: {
      type: String,
      default: false
    },
    T2: {
      type: Number,
    },
    t2_type: {
      type: String,
      default: false
    },
    T3: {
      type: Number,
    },
    t3_type: {
      type: String,
      default: false
    },
    T4: {
      type: Number,
    },
    t4_type: {
      type: String,
      default: false
    },
    t5: {
      type: Number,
    },
    t5_type: {
      type: String,
      default: false
    },
    trl: {
      type: Number,
    },
    trl_type:{
      type: String,
      default: false
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
      default: "Deactive"
    },

    pl_type: {
      type: String,
    },
    profit_loss_amt: {
      type: Number,
    },
    trade_type: {
      type: String
    },
    loss: {
      type: Number,
       
    },
    losspr: {
      type: Number,
      
    },
    profit: {
      type: Number
    },
    profitprr: {
      type: Number
    },
    expiryDate: {
      type: String
    },
type :{
  type: String,
 // required:true
  //Fno,Equity,Cash
},
  },


  { timestamps: true }
);




  module.exports = mongoose.model("alltrade", thisSchema);
