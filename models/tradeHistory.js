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
    sl_type: {
      type: String,
      // default: "false"
    },
    slTime: {
      type: String,
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
      type: Number,
    },
    t5_type: {
      type: String,
      // default: "false"
    },
    t6: {
      type: Number,
    },
    t6_type: {
      type: String,
      //  default: "false"
    },
    t7: {
      type: Number,
    },
    t7_type: {
      type: String,
      // default: "false"
    },
    trl: {
      type: Number,
    },
    trl_type: {
      type: String,
      //  default: "false"
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
      //    default: "NA"
    },
    tradeStatus: {
      type: String,
      //Closed
    },
    trade_type: {
      type: String
    },
    loss: {
      type: Number,

    },
    pl: {
      type: Number,
      //  default: 0
    },
    pl_per: {
      type: Number,
      //  default: 0

    },
    profit: {
      type: Number
    },
    profitprr: {
      type: Number
    },
    expiryDate:
      { type: mongoose.Schema.Types.ObjectId, ref: "exp_date" },

    type: {
      type: String,
      // required:true
      //Fno,Equity,Cash
    },
    FT1: {
      type: Number,
    },
    FT1_type: {
      type: String,
      //default: "false"
    },
    FT1time: {
      type: String,

    },
    FT2: {
      type: Number,
    },
    FT2_type: {
      type: String,
      //default: "false"
    },
    FT2time: {
      type: String,

    },
    FT3: {
      type: Number,
    },
    FT3_type: {
      type: String,
      // default: "false"
    },
    FT3time: {
      type: String,

    },
    FT4: {
      type: Number,
    },
    FT4_type: {
      type: String,
      //  default: "false"
    },
    FT4time: {
      type: String,

    },
    FT5: {
      type: Number,
    },
    FT5_type: {
      type: String,
      //default: "false"
    },
    FT5time: {
      type: String,

    },
    FT6: {
      type: Number,
    },
    FT6_type: {
      type: String,
      //default: "false"
    },
    FT6time: {
      type: String,

    },

    FT7: {
      type: Number,
    },
    FT7_type: {
      type: String,
      // default: "false"
    },
    FT7time: {
      type: String,

    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    img: {
      type: Array
    },
    noti_status: {
      type: String,
      //Active
    },
    tradeId: {
      type: Schema.Types.ObjectId, ref: "alltrade"
    },
    cstmMsg: {
      type: String,
    },
    updated_at: {
      type: String
    },
    tradeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "alltrade",
    },
    date: {
      type: String
    },
    loss: {
      type: Number,
      default: 0
    },
    loss_per: {
      type: Number,
    },
  },



  { timestamps: true }
);




module.exports = mongoose.model("tradehistory", thisSchema);
