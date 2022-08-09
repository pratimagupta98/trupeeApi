const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {


    script_type: { type: String, },
    //['CE', 'PF', 'BUY','SELL',],
    active_value: {
      type: Number,
    },
    active_value2: {
      type: Number
    },
    script_name:
    //  { type: mongoose.Schema.Types.ObjectId, ref: "script" },
    {
      type: String,
    },
    call_type: {
      type: String,
    },
    //  ['intraday','BTST', 'Short Term', 'Intraday or BTST','Intraday or BTST','Intraday (Risky)','Intraday (Trailed)','Intraday (Re-entry)','Intraday (Re-entry- Trailed)','Intraday (Hero-Zero)'],
    SL: {
      type: Number,
    },
    sl_type: {
      type: String,
      default: false
    },
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
      status: {
        type: String,
        default: "Deactive"
      },
      default: "Active"
    },
    pl_type: {
      type: String,
    },  //Profit , Loss
    profit_loss_amt: {
      type: Number,
    },
    expiryDate: {
      type: String
    },

  },

  { timestamps: true }
);


module.exports = mongoose.model("fnoEquity", thisSchema);
