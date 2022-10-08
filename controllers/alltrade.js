const Alltrade = require("../models/alltrade");
const moment = require('moment');
const resp = require("../helpers/apiResponse");
const TradeHistory = require("../models/tradeHistory");
const CstmMsg = require("../models/cstm_msg");
const _ = require("lodash");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
console.log("DATE",getCurrentDate())

exports.add_fnoIndex = async (req, res) => {
  const { script_type, fnoindex_scrpt_name, active_value, call_type, FT1_type, FT5, qty, no_of_lots, status, trade_type, expiryDate, type, t5, cstmMsg, date,tradeId } = req.body;

  if (trade_type == "BankNifty") {
    investment_amt = (req.body.qty * 25) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)
    let av2 = parseInt(req.body.active_value) + parseInt(10)
    console.log(av2)
    let SL = parseInt(req.body.active_value) - 20
    let trl = parseInt(av2) + parseInt(10)
    console.log(trl)
    let FT1 = parseInt(trl) + parseInt(20)
    console.log("FT1", FT1)
    let FT2 = parseInt(FT1) + parseInt(20)
    console.log("FT2", FT2)
    let FT3 = parseInt(FT2) + parseInt(20)
    console.log("FT3", FT2)

    //  let today = new Date();
    //  console.log("DATE",today);
    //   console.log(today.getDay());

    let getCurrentDate = function () {
      const t = new Date();
      const date = ("0" + t.getDate()).slice(-2);
      const month = ("0" + (t.getMonth() + 1)).slice(-2);
      const year = t.getFullYear();
      return `${date}-${month}-${year}`;
    };
    console.log("DATE",getCurrentDate())

    const newAlltrade = new Alltrade({

      script_type: script_type,
      fnoindex_scrpt_name: fnoindex_scrpt_name,

      active_value: active_value,
      active_value2: av2,
      call_type: call_type,
      qty: qty,
      investment_amt: investment_amt,
      no_of_lots: no_of_lots,
      status: status,
      trade_type: trade_type,
      FT1: FT1,
      FT1_type: FT1_type,
      FT2: FT2,
      FT3: FT3,
      FT5: FT5,
      t5: t5,
      SL: SL,
      trl: trl,
      active_value2: av2,
      expiryDate: expiryDate,
      type: type,
      cstmMsg: cstmMsg,
      date: getCurrentDate(),
      tradeId:tradeId
    });
    console.log("BODY",req.body)
    const newTradeHistory = new TradeHistory({
      script_type: script_type,
      fnoindex_scrpt_name: fnoindex_scrpt_name,
      active_value: active_value,
      active_value2: av2,
      call_type: call_type,
      qty: qty,
      investment_amt: investment_amt,
      no_of_lots: no_of_lots,
      status: status,
      trade_type: trade_type,
      FT1: FT1,
      FT2: FT2,
      FT3: FT3,
      FT5: FT5,
      t5: t5,
      SL: SL,
      trl: trl,
      active_value2: av2,
      expiryDate: expiryDate,
      type: type,
      cstmMsg: cstmMsg,
      updated_at: getCurrentDate()
    });
    newAlltrade
      .save()
      .then((data) => {
          //  const makertradehistory = await TradeHistory.create(newTradeHistory);
          // console.log("MMMMMM",makertradehistory)
        res.status(200).json({
          status: true,

          msg: "success",
          data: data,
          _id: data?._id,
          tradeId: data._id,
          active_value2: av2,
          investment_amt: investment_amt,
          trl: trl,
          FT1: FT1,
          FT2: FT2,
          FT3: FT3,
          SL: SL,
        })
      })

  } else if (trade_type == "Nifty") {
    investment_amt = (req.body.qty * 50) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)
    let av2 = parseInt(req.body.active_value) + parseInt(5)
    console.log(av2)
    let SL = parseInt(req.body.active_value) - 10
    let trl = parseInt(av2) + parseInt(5)
    console.log(trl)
    let FT1 = parseInt(trl) + parseInt(10)
    console.log("FT1", FT1)
    let FT2 = parseInt(FT1) + parseInt(10)
    console.log("FT2", FT2)
    let FT3 = parseInt(FT2) + parseInt(10)
    console.log("FT3", FT2)
    //  let today = new Date();
    //  console.log("DATE",today);
    //   console.log(today.getDay());

    let getCurrentDate = function () {
      const t = new Date();
      const date = ("0" + t.getDate()).slice(-2);
      const month = ("0" + (t.getMonth() + 1)).slice(-2);
      const year = t.getFullYear();
      return `${year}-${month}-${date}`;
    };

    const newAlltrade = new Alltrade({
      script_type: script_type,
      fnoindex_scrpt_name: fnoindex_scrpt_name,
      active_value: active_value,
      active_value2: av2,
      call_type: call_type,
      qty: qty,
      investment_amt: investment_amt,
      no_of_lots: no_of_lots,
      status: status,
      trade_type: trade_type,
      FT1: FT1,
      FT2: FT2,
      FT3: FT3,
      FT5: FT5,
      t5: t5,
      SL: SL,
      trl: trl,
      active_value2: av2,
      expiryDate: expiryDate,
      type: type,
      cstmMsg: cstmMsg,
      updated_at: getCurrentDate()
      // loss:loss,
      // losspr:losspr,
      //profit:profit,
      //profitprr:profitprr
    });

    const newTradeHistory = new TradeHistory({
      script_type: script_type,
      fnoindex_scrpt_name: fnoindex_scrpt_name,
      active_value: active_value,
      active_value2: av2,
      call_type: call_type,
      qty: qty,
      investment_amt: investment_amt,
      no_of_lots: no_of_lots,
      status: status,
      trade_type: trade_type,
      FT1: FT1,
      FT2: FT2,
      FT3: FT3,
      FT5: FT5,
      t5: t5,
      SL: SL,
      trl: trl,
      active_value2: av2,
      expiryDate: expiryDate,
      type: type,
      cstmMsg: cstmMsg,
      updated_at: getCurrentDate()
      // loss:loss,
      // losspr:losspr,
      //profit:profit,
      //profitprr:profitprr
    });

    newAlltrade
      .save()
      .then(async (data) => {
        //   const makertradehistory = await TradeHistory.create(newTradeHistory);
        // console.log("KKKKK",makertradehistory)
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
          active_value2: av2,
          investment_amt: investment_amt,
          trl: trl,
          FT1: FT1,
          FT2: FT2,
          FT3: FT3,
          SL: SL,
        })
      })
      .catch((error) => resp.errorr(res, error));

  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error"
    })
  }
}


exports.add_fnoEquity = async (req, res) => {

  const { script_type, fnoequty_scrpt_name, active_value, active_value2, call_type, SL, sl_type, T1, t1_type, T2, t2_type, T3, t3_type, T4, t4_typet, t5, t5_type, qty, no_of_lots, pl_type, profit_loss_amt, expiryDate, type, status, cstmMsg } = req.body;


  investment_amt = (req.body.qty * 150) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)




  const newAlltrade = new Alltrade({

    script_type: script_type,
    fnoequty_scrpt_name: fnoequty_scrpt_name,
    active_value: active_value,
    active_value2: active_value2,
    call_type: call_type,
    SL: SL,
    sl_type: sl_type,
    T1: T1,
    t1_type: t1_type,
    T2: T2,
    t2_type: t2_type,
    T3: T3,
    t3_type: t3_type,
    T4: T4,
    t4_typet: t4_typet,
    t5: t5,
    t5_type: t5_type,
    qty: qty,
    investment_amt: investment_amt,
    no_of_lots: no_of_lots,
    pl_type: pl_type,
    profit_loss_amt: profit_loss_amt,
    expiryDate: expiryDate,
    type: type,
    status: status,
    cstmMsg: cstmMsg

  });

  newAlltrade
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}

exports.add_equityCash = async (req, res) => {

  const { script_type, cash_scrpt_name, active_value, active_value2, call_type, SL, sl_type, T1, t1_type, T2, t2_type, T3, t3_type, T4, t4_type, t5, t5_type, qty, no_of_lots, pl_type, profit_loss_amt, expiryDate, type, status, cstmMsg } = req.body;


  investment_amt = (req.body.qty) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)

  const newnewAlltrade = new Alltrade({

    script_type: script_type,
    cash_scrpt_name: cash_scrpt_name,
    active_value: active_value,
    active_value2: active_value2,
    call_type: call_type,
    SL: SL,
    sl_type: sl_type,
    T1: T1,
    t1_type: t1_type,
    T2: T2,
    t2_type: t2_type,
    T3: T3,
    t3_type: t3_type,
    T4: T4,
    t5: t5,
    t5_type: t5_type,
    qty: qty,
    investment_amt: investment_amt,
    no_of_lots: no_of_lots,
    pl_type: pl_type,
    profit_loss_amt: profit_loss_amt,
    expiryDate: expiryDate,
    type: type,
    status: status,
    cstmMsg: cstmMsg

  });

  newnewAlltrade
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}


//APP,ADMIN TRDAE LIST
exports.tradelist = async (req, res) => {
  await Alltrade.find({ status: "Active" }).populate("fnoindex_scrpt_name").populate("fnoequty_scrpt_name").populate("cash_scrpt_name").populate("expiryDate")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//ADMIN
exports.fnoIndexlist = async (req, res) => {
  await Alltrade.find({ type: "Index" }).populate("fnoindex_scrpt_name").populate("expiryDate")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//APP
exports.AppindexList = async (req, res) => {
  await Alltrade.find({ $and: [{ type: "Index" }, { status: "Active" }] }).populate("fnoindex_scrpt_name").populate("expiryDate")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//ADMIN
exports.fnoEquity_list = async (req, res) => {
  await Alltrade.find({ type: "Equity" }).populate("fnoequty_scrpt_name").populate("expiryDate")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
//APP
exports.AppOptionList = async (req, res) => {
  await Alltrade.find({ $and: [{ type: "Equity" }, { status: "Active" }] }).populate("fnoequty_scrpt_name").populate("expiryDate")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//ADMIN
exports.equityCash_list = async (req, res) => {
  await Alltrade.find({ type: "Cash" }).populate("cash_scrpt_name").populate("expiryDate")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
//APP
exports.dlt_alltrade = async (req, res) => {
  await Alltrade.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.AppCashList = async (req, res) => {
  await Alltrade.find({ $and: [{ type: "Cash" }, { status: "Active" }] }).populate("cash_scrpt_name").populate("expiryDate")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

// exports.editFnoindex = async (req, res) => {

//   const { SL, pl, pl_per, qty, active_value, sl_type, FT1, FT1_type, FT2, FT2_type, FT3, FT3_type, FT6, FT6_type, FT7, FT7_type, status, t5, cstmMsg, tradeStatus, updated_at, trade_type } = req.body
//   let getCurrentDate = function () {
//     const t = new Date();
//     const date = ("0" + t.getDate()).slice(-2);
//     const month = ("0" + (t.getMonth() + 1)).slice(-2);
//     const year = t.getFullYear();
//     return `${date}-${month}-${year}`;
//   };

//   let dat = getCurrentDate()
//   console.log("DTT", dat)

//   const finodne = await Alltrade.findOne({ trade_type: trade_type })
//   console.log("FINDONE", finodne)
//   if (finodne?.trade_type == "BankNifty") {
//     if (sl_type == "true") {
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)


//       let SL = parseInt(req.body.active_value) - 20
//       console.log("SL", SL)

//       let pl = (req.body.qty * 25) * (SL - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2)
//       console.log("PL%%%%", pl_per)
//       let FT1 = finodne.FT1
//       let FT1_type = finodne.FT1_type
//       console.log("FT1", FT1)
//       let FT2 = finodne.FT2
//       let FT2_type = finodne.FT2_type

//       let FT3 = finodne.FT3
//       let FT3_type = finodne.FT3_type

//       // let status = finodne.status
//       let tradeStatus = finodne.tradeStatus


//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: { sl_type: "true", FT1_type: "false", FT1, FT2_type: "false", FT2, FT3_type: "false", pl, pl_per, investment_amt, SL, status: "Active", t5, cstmMsg, tradeStatus, updated_at: dat, trade_type } },
//         { new: true }

//       )
//       let status = update.status
//       console.log("STATUS", status)
//       console.log("UPDATE", update)
//       const newTradeHistory = new TradeHistory({
//         qty: qty,
//         active_value: active_value,
//         sl_type: sl_type,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         status: status,
//         SL: SL,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatus,


//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             // update:update,
//             //   active_value2 :av2,
//             investment_amt: investment_amt,
//             //  trl :trl,
//             // FT1:FT1   ,
//             // FT2:FT2,
//             // FT3:FT3,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per

//           })
//           console.log("DATA", data)
//           console.log("UPDATE", update)

//         })
//     } else if (FT1_type == "true" && FT2_type == "true" && FT3_type == "true") {

//       console.log("ABCD")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)

//       let FT3 = parseInt(FT2) + parseInt(20)
//       console.log("FT3", FT3)
//       let pl = (req.body.qty * 25) * (FT3 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)



//       //    let update=  await Alltrade.findOneAndUpdate(
//       //     { _id: req.params.id },

//       //     {$set: {sl_type:"false",FT1,FT1_type,FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,status:"Active",t5,cstmMsg,tradeStatus}} ,

//       //   //{ $set: {status:"success"} },
//       //   { new: true }

//       // )
//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: { sl_type: "true", FT1_type: "false", FT1, FT2_type: "false", FT2, FT3_type: "false", pl, pl_per, investment_amt, SL, status: "Active", t5, cstmMsg, tradeStatus, updated_at: dat, trade_type } },
//         { new: true }

//       )
//       // let status = update.status
//       console.log("STATUS", status)
//       console.log("UPDATE", update)
//       const newTradeHistory = new TradeHistory({
//         qty: qty,
//         active_value: active_value,
//         sl_type: sl_type,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         status: status,
//         SL: SL,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatus,


//       })

//       newTradeHistory.save()
//         .then((data) => resp.successr(res, data))
//         .catch((error) => resp.errorr(res, error))
//       // .then((data) => resp.successr(res, data))
//       // .catch((error) => resp.errorr(res, error))


//     } else if (FT1_type == "true" && FT2_type == "true") {
//       console.log("EFGH")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)
//       let pl = (req.body.qty * 25) * (FT2 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = pl / investment_amt * 100
//       console.log("PL%%%%", pl_per)

//       //   getpl = await Alltrade.findOne({pl:pl})
//       //   if (getpl){
//       //  //console.log("$$$$$$$$",getpl)
//       //    tpl =getpl.pl
//       //    console.log("###",tpl)
//       //    invest_amt = getpl.investment_amt
//       //    console.log("***",invest_amt)
//       //    pl_per = tpl/invest_amt*100
//       //    console.log("%%%%",pl_per)
//       //   }


//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },

//         { $set: { sl_type: "false", FT1, FT1_type, FT2, FT2_type, FT3, FT3_type, pl_per, pl, investment_amt, status, t5, cstmMsg, tradeStatus } },

//         //{ $set: {status:"success"} },
//         { new: true }

//       )
//         .then((data) => resp.successr(res, data))
//         .catch((error) => resp.errorr(res, error));
//     }
//     else if (FT1_type == "true") {
//       console.log("abcd")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
//       let pl = (req.body.qty * 25) * (FT1 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = pl / investment_amt * 100
//       console.log("PL%%%%", pl_per)

//       getpl = await Alltrade.findOne({ pl: pl })
//       if (getpl) {
//         //console.log("$$$$$$$$",getpl)
//         tpl = getpl.pl
//         console.log("###", tpl)
//         invest_amt = getpl.investment_amt
//         console.log("Investamt***", invest_amt)
//         pl_per = tpl / invest_amt * 100
//         console.log("%%%%", pl_per)
//       }


//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },

//         { $set: { sl_type: "false",SL,FT1_type: "true", sl_type: "false", FT2, FT2_type, FT3, FT3_type, pl_per, pl, investment_amt, FT1, status, t5, cstmMsg, tradeStatus } },

//         //{ $set: {status:"success"} },
//         { new: true }

//       )
         

//     } else if (FT6_type == "true") {
//       console.log("abcd")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)


//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)

//       let FT3 = parseInt(FT2) + parseInt(20)
//       console.log("FT3", FT3)
//       let FT5 = parseInt(FT3) + parseInt(20)
//       console.log("FT3", FT5)
//       let FT6 = parseInt(FT5) + parseInt(20)
//       console.log("FT3", FT6)

//       let pl = (req.body.qty * 25) * (FT6 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = pl / investment_amt * 100
//       console.log("PL%%%%", pl_per)

//       getpl = await Alltrade.findOne({ pl: pl })
//       if (getpl) {
//         //console.log("$$$$$$$$",getpl)
//         tpl = getpl.pl
//         console.log("###", tpl)
//         invest_amt = getpl.investment_amt
//         console.log("Investamt***", invest_amt)
//         pl_per = tpl / invest_amt * 100
//         console.log("%%%%", pl_per)
//       }


//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },

//         { $set: { FT1_type: "true", sl_type: "false", FT2, FT2_type, FT3, FT3_type, FT6, FT6_type, FT7, FT7_type, pl_per, pl, investment_amt, FT1, status, t5, cstmMsg, tradeStatus } },

//         //{ $set: {status:"success"} },
//         { new: true }

//       )
//         .then((data) => resp.successr(res, data))
//         .catch((error) => resp.errorr(res, error));

//     }

//   } else if (finodne?.trade_type == "Nifty") {
//     //   if(finodne.trade_type == "Nifty"){
//     //     // console.log("SUCCESS")
//     //     if (sl_type == "true") {
//     //       investment_amt =  (req.body.qty*50)*(req.body.active_value)
//     //       console.log("InvestAMT",investment_amt)


//     //       let SL = parseInt(req.body.active_value) -10
//     //       console.log("SL",SL)

//     //       pl = (req.body.qty*50) *(SL -  req.body.active_value)
//     //       console.log("PL",pl)

//     //       pl_per = pl/investment_amt*100
//     //       console.log("PL%%%%",pl_per)


//     //       let update=  await Alltrade.findOneAndUpdate(
//     //        { _id: req.params.id },

//     //        {$set: {sl_type:"true",FT1_type:"false",FT2_type:"false",FT3_type:"false",pl_per,pl,investment_amt,SL,status,t5,cstmMsg,tradeStatus,updated_at :dat}} ,

//     //      //{ $set: {status:"success"} },
//     //      { new: true }

//     //    )    
//     //    newTradeHistory.save()
//     //    .then((data) => resp.successr(res, data))
//     //    .catch((error) => resp.errorr(res, error));
//     //   }  else if(FT1_type == "true" && FT2_type == "true" && FT3_type == "true"){
//     //     console.log("ABCD")
//     //     investment_amt =  (req.body.qty*50)*(req.body.active_value)
//     //     console.log("InvestAMT",investment_amt)
//     //     let  av2 = parseInt(req.body.active_value) + parseInt(5)
//     //     console.log("AV2",av2)
//     //        let trl = parseInt(av2) + parseInt(5)
//     //       console.log("TRL",trl)
//     //      let  FT1 =parseInt (trl) + parseInt(10)
//     //      console.log("FT1",FT1)
//     //    let  FT2 = parseInt (FT1) + parseInt(10)
//     //      console.log("FT2",FT2)

//     //     let FT3 = parseInt (FT2) + parseInt(10)
//     //      console.log("FT3",FT3)
//     //      pl =(req.body.qty*50) *(FT3 -  req.body.active_value)
//     //      console.log("PL",pl)

//     //      pl_per = (pl/investment_amt*100 ).toFixed(2);
//     //      console.log("PL%%%%",pl_per)



//     //      let update=  await Alltrade.findOneAndUpdate(
//     //       { _id: req.params.id },

//     //       {$set: {sl_type:"false",FT1,FT1_type,FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,status,t5,cstmMsg,tradeStatus}} ,

//     //     //{ $set: {status:"success"} },
//     //     { new: true }

//     //   )
//     //   newTradeHistory.save()
//     //   .then((data) => resp.successr(res, data))
//     //   .catch((error) => resp.errorr(res, error))
//     //   // .then((data) => resp.successr(res, data))
//     //   // .catch((error) => resp.errorr(res, error))


//     // }  else if(FT1_type == "true" && FT2_type == "true"){
//     //     console.log("EFGH")
//     //     investment_amt =  (req.body.qty*50)*(req.body.active_value)
//     //     console.log("InvestAMT",investment_amt)
//     //     let  av2 = parseInt(req.body.active_value) + parseInt(5)
//     //     console.log("AV2",av2)
//     //        let trl = parseInt(av2) + parseInt(5)
//     //       console.log("TRL",trl)
//     //      let  FT1 =parseInt (trl) + parseInt(10)
//     //      console.log("FT1",FT1)
//     //     let FT2 = parseInt (FT1) + parseInt(10)
//     //      console.log("FT2",FT2)
//     //      pl = (req.body.qty*50) *(FT2 -  req.body.active_value)
//     //      console.log("PL",pl)

//     //      pl_per = pl/investment_amt*100
//     //      console.log("PL%%%%",pl_per)

//     //       getpl = await Alltrade.findOne({pl:pl})
//     //       if (getpl){
//     //      //console.log("$$$$$$$$",getpl)
//     //        tpl =getpl.pl
//     //        console.log("###",tpl)
//     //        invest_amt = getpl.investment_amt
//     //        console.log("***",invest_amt)
//     //        pl_per = tpl/invest_amt*100
//     //        console.log("%%%%",pl_per)
//     //       }


//     //      let update=  await Alltrade.findOneAndUpdate(
//     //       { _id: req.params.id },

//     //       {$set: {sl_type:"false",FT1,FT1_type,FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,status,t5,cstmMsg,tradeStatus}} ,

//     //     //{ $set: {status:"success"} },
//     //     { new: true }

//     //   )
//     //   .then((data) => resp.successr(res, data))
//     //    .catch((error) => resp.errorr(res, error));
//     // }  
//     //   else if (  FT1_type == "true") {
//     //     console.log("abcd")
//     //     investment_amt =  (req.body.qty*50)*(req.body.active_value)
//     //     console.log("InvestAMT",investment_amt)
//     //     let  av2 = parseInt(req.body.active_value) + parseInt(5)
//     //     console.log("AV2",av2)
//     //        let trl = parseInt(av2) + parseInt(5)
//     //       console.log("TRL",trl)
//     //      let  FT1 =parseInt (trl) + parseInt(10)
//     //      console.log("FT1",FT1)
//     //      pl =(req.body.qty*50) *(FT1 -  req.body.active_value)
//     //      console.log("PL",pl)

//     //      pl_per = pl/investment_amt*100
//     //      console.log("PL%%%%",pl_per)

//     //       getpl = await Alltrade.findOne({pl:pl})
//     //       if (getpl){
//     //      //console.log("$$$$$$$$",getpl)
//     //        tpl =getpl.pl
//     //        console.log("###",tpl)
//     //        invest_amt = getpl.investment_amt
//     //        console.log("Investamt***",invest_amt)
//     //        pl_per = tpl/invest_amt*100
//     //        console.log("%%%%",pl_per)
//     //       }


//     //      let update=  await Alltrade.findOneAndUpdate(
//     //       { _id: req.params.id },

//     //       {$set: {FT1_type:"true",sl_type:"false",FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,FT1,status,t5,cstmMsg,tradeStatus}} ,

//     //     //{ $set: {status:"success"} },
//     //     { new: true }

//     //   )
//     //   .then((data) => resp.successr(res, data))
//     //    .catch((error) => resp.errorr(res, error));

//     //   } 
//     //   }
//     console.log("gdghd")

//   }
// }


exports.editfnoOption = async (req, res) => {
  const { qty, active_value, SL, sl_type, T1, t1_type, T2, t2_type, T3, t3_type, T4, t4_type, status, t5, t5_type, cstmMsg } = req.body



  if (sl_type == "true") {
    investment_amt = (req.body.qty * 150) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)




    pl = (req.body.qty * 150) * (req.body.SL - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { SL,tradeStatus: "Closed", sl_type: "true", T1, t1_type: "false", T2, t2_type: "false", T3, t3_type: "false", T4, t4_type: "false", pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg } },

      //{ $set: {status:"success"} },
      { new: true }

    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else if (t1_type == "true") {
    investment_amt = (req.body.qty * 150) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)


    pl = (req.body.qty * 150) * (req.body.T1 - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { T1, t1_type, SL, sl_type: "false", T2, t2_type, T3, t3_type, T4, t4_type, pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg,tradeStatus:req.body.tradeStatus,} },

      //{ $set: {status:"success"} },
      { new: true }

    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));

  } else if (t2_type == "true") {

    investment_amt = (req.body.qty * 150) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)


    pl = (req.body.qty * 150) * (req.body.T2 - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { T1, t1_type, SL, sl_type: "false", T2, t2_type, T3, t3_type, T4, t4_type, pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg ,tradeStatus:req.body.tradeStatus,} },

      //{ $set: {status:"success"} },
      { new: true }

    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));

  } else if (t3_type == "true") {
    investment_amt = (req.body.qty * 150) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)


    pl = (req.body.qty * 150) * (req.body.T3 - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { T1, t1_type, SL, sl_type: "false", T2, t2_type, T3, t3_type, T4, t4_type, pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg,tradeStatus:req.body.tradeStatus, } },

      //{ $set: {status:"success"} },
      { new: true }

    )

      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else if (t4_type == "true") {
    investment_amt = (req.body.qty * 150) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)


    pl = (req.body.qty * 150) * (req.body.T4 - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100)
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { T1, t1_type, SL, sl_type: "false", T2, t2_type, T3, t3_type, T4, t4_type, pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg,tradeStatus:req.body.tradeStatus, } },

      //{ $set: {status:"success"} },
      { new: true }

    )

      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };



 }

exports.editCash = async (req, res) => {
  const { qty, active_value, SL, sl_type, T1, t1_type, T2, t2_type, T3, t3_type, T4, t4_type, status, t5, t5_type, cstmMsg } = req.body

  if (sl_type == "true") {
    investment_amt = (req.body.qty * 400) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)




    pl = (req.body.qty * 400) * (req.body.SL - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { SL, sl_type: "true", T1, t1_type: "false", T2, t2_type: "false", T3, t3_type: "false", T4, t4_type: "false", pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg } },

      //{ $set: {status:"success"} },
      { new: true }

    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else if (t1_type == "true") {
    investment_amt = (req.body.qty * 400) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)


    pl = (req.body.qty * 400) * (req.body.T1 - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { T1, t1_type, SL, sl_type: "false", T2, t2_type, T3, t3_type, T4, t4_type, pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg, active_value } },

      //{ $set: {status:"success"} },
      { new: true }

    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));

  } else if (t2_type == "true") {

    investment_amt = (req.body.qty * 400) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)


    pl = (req.body.qty * 400) * (req.body.T2 - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { T1, t1_type, SL, sl_type: "false", T2, t2_type, T3, t3_type, T4, t4_type, pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg, active_value } },

      //{ $set: {status:"success"} },
      { new: true }

    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));

  } else if (t3_type == "true") {
    investment_amt = (req.body.qty * 400) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)


    pl = (req.body.qty * 400) * (req.body.T3 - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { T1, t1_type, SL, sl_type: "false", T2, t2_type, T3, t3_type, T4, t4_type, pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg } },

      //{ $set: {status:"success"} },
      { new: true }

    )

      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else if (t4_type == "true") {
    investment_amt = (req.body.qty * 400) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)


    pl = (req.body.qty * 400) * (req.body.T4 - req.body.active_value)
    console.log("PL", pl)

    pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)


    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { T1, t1_type, SL, sl_type: "false", T2, t2_type, T3, t3_type, T4, t4_type, pl_per, pl, investment_amt, status, t5, t5_type, cstmMsg } },

      //{ $set: {status:"success"} },
      { new: true }

    )

      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

}

exports.editalltrade = async (req, res) => {
   update = await Alltrade.findOneAndUpdate(
      {
        _id: req.params.id,
        //  console.log(req.params._id);
      },
      {
        $set: req.body,
      },
      { new: true }
    )
//    let SL=  update.SL
//    let sl_type =update.sl_type
//    let qty = update.qty
//    let active_value = update.active_value
//    let FT1 = update.FT1
//    let FT1_type= update.FT1_type
//   let  FT2 = update.FT2
//    let FT2_type=  update.FT2_type
//   let FT3 = update.FT3
//   let FT3_type = update.FT3_type
// let pl= update.pl
// let pl_per = update.pl_per
// let investment_amt = update.investment_amt
// let cstmMsg = update.cstmMsg
// let trdests =update.tradeStatus
// let type = update.type
// let trl = update.trl
//     const newTradeHistory = new TradeHistory({

//       SL: SL,
//       sl_type: sl_type,
//       qty: qty,
//       active_value: active_value,
//       FT1: FT1,
//       FT1_type: FT1_type,
//       FT2: FT2,
//       FT2_type: FT2_type,
//       FT3: FT3,
//       FT3_type: FT3_type,
//       pl: pl,
//       pl_per: pl_per,
//       investment_amt: investment_amt,
//       cstmMsg: cstmMsg,
//       tradeStatus: trdests,
//       trl :trl,
//     //  tradeId:tradeId,
//       type:type
//     })
//     newTradeHistory
//       .save()
//       .then((data) => {
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: data,
//           investment_amt: investment_amt,
//           SL: SL,
//           PL: pl,
//           PLPER: pl_per,
//           FT1: FT1,
//           FT1_type: FT1_type,
//           FT2: FT2,
//           FT2_type: FT2_type,
//           FT3: FT3,
//           FT3_type: FT3_type,
//           tradeStatus: trdests,
//         //  tradeId:tradeId,
//         trl :trl,
//           type:type
//         })
//         console.log("DATA", data)
//         console.log("UPDATE", update)

//       })


    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.viewonetrades = async (req, res) => {
  await Alltrade.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};




exports.add_notificationss = async (req, res) => {
  const { title, desc, img, noti_status } = req.body;

  const newTradeHistory = new TradeHistory({
    title: title,
    desc: desc,
    noti_status: noti_status

  });

  const findexist = await TradeHistory.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      if (req.files.img[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.img.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.img[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.img[i].path);
          alluploads.push(resp.secure_url);
        }
        newTradeHistory.img = alluploads;
      }
    }
    newTradeHistory
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


// exports.notificationList = async (req, res) => {
//   await TradeHistory.find({ $or: [{ status: "Active" }, { noti_status: "Notification" }] }).populate("fnoindex_scrpt_name").populate("fnoequty_scrpt_name").populate("cash_scrpt_name").populate("expiryDate").populate("tradeId")
//     .sort({ sortorder: 1 })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

exports.notificationList = async (req, res) => {
  await TradeHistory.find().populate("fnoindex_scrpt_name").populate("fnoequty_scrpt_name").populate("cash_scrpt_name").populate("expiryDate").populate("tradeId")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.addTnotification = async (req, res) => {
  const { tradeId, desc, noti_status } = req.body;

  const newAlltrade = new Alltrade({
    tradeId: tradeId,
    desc: desc,
    noti_status: noti_status
  })

  newAlltrade.save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}




exports.datefilter = async (req, res) => {
  var dateStr = new Date(year, month, day, 0, 0, 0);
  var nextDate = new Date(year, month, day, 23, 59, 59);
  await TradeHistory.find({ "createdAt": { $gte: new ISODate(dateStr), $lte: new ISODate(nextDate) } })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.totlactivetrade = async (req, res) => {
  await Alltrade.countDocuments({ status: "Active" })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};


exports.ttlCompletetrade = async (req, res) => {
  await Alltrade.countDocuments({ tradeStatus: "Closed" })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.completedTrade = async (req, res) => {
  await Alltrade.find({ status: "Closed" })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



// exports.editFnoindex = async (req, res) => {
//   const { fnoindex_scrpt_name,active_value, trade_type, SL, sl_type, FT1_type, FT2, FT2_type, FT3, FT3_type,FT4_type, FT5, FT5_type, FT4,FT6, FT6_type, FT7, FT7_type, qty, cstmMsg, status, tradeStatus,trl, pl, pl_per,type,FT1time,FT2time,call_type,date,script_type,loss, loss_per } = req.body

//   let findone = await Alltrade.findOne({ trade_type: trade_type })
//  // console.log("FINDONE", findone)


//   if (findone?.trade_type == "BankNifty") {
//     if (sl_type == "true") {
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let SL = parseInt(req.body.active_value) - 20
//       console.log("SL", SL)
//      // let pl = (req.body.qty * 25) * (SL - req.body.active_value)
//       let loss = (req.body.qty * 25) * (SL - req.body.active_value)
//       console.log("PL", loss)
//       let loss_per = (loss / investment_amt * 100).toFixed(2)
//       console.log("PL%%%%", loss_per)
//       let FT1 = findone.FT1
//       console.log("ft11111", FT1)
//       let FT1_type = findone.FT1_type
//       let FT2 = findone.FT2
//       let FT2_type = findone.FT2_type

//       let FT3 = findone.FT3
//       let FT3_type = findone.FT3_type
//       let type = findone.type
//       let fnoindex_scrpt_name = findone.fnoindex_scrpt_name
//       let script_type = findone.script_type
//       let active_value2 = findone.active_value2
//       let call_type = findone.call_type
//       let active_value = findone.active_value
//      // console.log("TRADEID",tradeId)
//      let tradeStatus = findone.tradeStatus
//      let qty = findone.qty
// let no_of_lots = findone.no_of_lots
// let trl = findone.trl
//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: { SL, sl_type: "true", pl, pl_per, investment_amt, status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus, trade_type ,type,fnoindex_scrpt_name,call_type,date,FT1_type:"false",FT2_type:"false",FT3_type:"false"} },
//         { new: true }
//       )
//       if(update){
//       let status = update.status
//       let tradeId= update._id
//       console.log("TRADEID",tradeId)
//     let trdests = update.tradeStatus
//     let fnoindex_scrpt_name =update.fnoindex_scrpt_name
//    let  trade_type = update.trade_type
//   let FT1_type = update.FT1_type
//   let FT2_type = update.FT2_type
//   let FT3_type = update.FT3_type
// //let getCurrentDate = function () {
//   const sltym = new Date().toString()
  
//   console.log("isodate",sltym)

// //   const date = ("0" + t.getDate()).slice(-2);
// //   const month = ("0" + (t.getMonth() + 1)).slice(-2);
// //   const year = t.getFullYear();
// //   const hour = t.getHours();
// //   var ampm = hour >= 12 ? 'PM' : 'AM';
// //   const minute = t.getMinutes();
// //   const second = t.getSeconds();
// //  // var minutes = minute < 10 ? '0'+ minutes : minutes
// //   return `${date}/${month}/${year} ${hour}:${minute}:${second} ${ampm}`;
// // };
 
// // var today = new Date();
// // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//      // let type = update.type
//    //  console.log("TRADESTS", tradeStatus)
//    //   console.log("STATUS", status)
//      console.log("UPDATE", update)

//       const newTradeHistory = new TradeHistory({
//         trade_type:trade_type,
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         call_type:call_type,
//         date:getCurrentDate(),
//         SL: SL,
//         slTime:sltym,
//         script_type:script_type,
//         findone:findone,
//         active_value2:active_value2,
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         qty:qty,
//         no_of_lots:no_of_lots,
//         trl :trl,
//         call_type:call_type,
//         sl_type: sl_type,
//         qty: qty,
//         active_value: active_value,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         status: status,
//       //  pl: pl,
//         loss:loss,
//         loss_per: loss_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: trdests,
//         tradeId:tradeId,
//         type:type
//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             investment_amt: investment_amt,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per,
//             FT1: FT1,
//             FT1_type: FT1_type,
//             FT2: FT2,
//             FT2_type: FT2_type,
//             FT3: FT3,
//             FT3_type: FT3_type,
//             tradeStatus: trdests,
//             tradeId:tradeId,
//             type:type
//           })
        
//           // console.log("DATA", data)
//           // console.log("UPDATE", update)

//         })
//       }else{
//         res.status(400).json({
//           status : false,
//           error : "error",
//           error : error
//       })
//       }

//     } else if (FT1_type == "true" && FT2_type == "true" && FT3_type == "true") {
//       console.log("ABCD")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)

//       let FT3 = parseInt(FT2) + parseInt(20)
//       console.log("FT3", FT3)

//       let pl = (req.body.qty * 25) * (FT3 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)
//       //let tradeStatus = findone.tradeStatus

//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type: "true", pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl,type } },
//         { new: true }

//       )
//       if(update){
//       let status = update.status
//       let tradeStatuss = update.tradeStatus
//       let tradeId= update._id
//       let type = update.type
//       console.log("TRADEID",tradeId)
//       let fnoindex_scrpt_name =update.fnoindex_scrpt_name
//       let trade_type =update.trade_type

      
//       // console.log("TRADESTS", tradeStatuss)
//       // console.log("STATUS", status)
//       // console.log("UPDATE", update)
//       const FT1tym = new Date().toString()
//       console.log("FT1tym ",FT1tym)
    
//       const FT2tym = new Date().toString()
//       console.log("isodate",FT2tym)

//       const FT3tym = new Date().toString()
//       console.log("isodate",FT3tym)
//       const newTradeHistory = new TradeHistory({
//         trade_type:trade_type,
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         qty: qty,
//         active_value: active_value,
//         FT1: FT1,
//         FT1time:FT1tym,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2time:FT2tym,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3time:FT3tym,
//         FT3_type: FT3_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatuss,
//         trl:trl,
//         tradeId:tradeId,
//         type:type
//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             investment_amt: investment_amt,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per,
//             FT1: FT1,
//             FT1_type: FT1_type,
//             FT2: FT2,
//             FT2_type: FT2_type,
//             FT3: FT3,
//             FT3_type: FT3_type,
//             tradeStatus: tradeStatus,
//             tradeId:tradeId,
//             type:type
//           })
//           // console.log("DATA", data)
//           // console.log("UPDATE", update)

//         })
//       }else{
//         res.status(400).json({
//           status : false,
//           error : "error",
//           error : error
//       })
//       }

//     } else if (FT1_type == "true" && FT2_type == "true") {
//       console.log("EFGH")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)
//       let pl = (req.body.qty * 25) * (FT2 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)

//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },

//         { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//         { new: true }
//       )
//       if(update){
//       let status = update.status
//       let tradeStatuss = update.tradeStatus
//       let tradeId= update._id
//       console.log("TRADEID",tradeId)
//       // console.log("TRADESTS", tradeStatuss)
//       // console.log("STATUS", status)
//       // console.log("UPDATE", update)
//       let fnoindex_scrpt_name =update.fnoindex_scrpt_name
//       let trade_type = update.trade_type
//       console.log("TRADTYPEEE",trade_type)
//       const FT1tym = new Date().toString()
//       console.log("FT1tym ",FT1tym)

//       const FT2tym = new Date().toString()
//       console.log("FT2tym",FT2tym)

//       const newTradeHistory = new TradeHistory({ 
//         trade_type:trade_type,
//         fnoindex_scrpt_name:fnoindex_scrpt_name,       
//         qty: qty,
//         active_value: active_value,
//         FT1: FT1,
//         FT1time:FT1tym,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2time:FT2tym,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatuss,
//         tradeId:tradeId
//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             investment_amt: investment_amt,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per,
//             FT1: FT1,
//             FT1_type: FT1_type,
//             FT2: FT2,
//             FT2_type: FT2_type,

//             FT3: FT3,
//             FT3_type: FT3_type,
//             tradeStatus: tradeStatus,
//             trl:trl,
//             tradeId:tradeId
//           })
//           // console.log("DATA", data)
//           // console.log("UPDATE", update)

//         })
//       }else{
//         res.status(400).json({
//           status : false,
//           error : "error",
//           error : "error"
//       })
//       }


//     } else if (FT1_type == "true") {
//       console.log("abcd")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
//       let pl = (req.body.qty * 25) * (FT1 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)

//       let SL= findone.SL
//       let sl_type = findone.sl_type
//       let FT2 = findone.FT2
//       let FT2_type = findone.FT2_type

//       let FT3 = findone.FT3
//       let FT3_type = findone.FT3_type
        
      
//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },

//         { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type:"false", FT2, FT3_type,FT3, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl ,call_type,date,loss} },
//         { new: true }
//       ).populate("fnoindex_scrpt_name")
//        if(update){
       
//       let status = update.status
//       let tradeStatuss = update.tradeStatus
//       let tradeId= update._id
//       console.log("TRADEID",tradeId)
//       let fnoindex_scrpt_name =update.fnoindex_scrpt_name
// let call_type = update.call_type
// let script_type = update.script_type
// let FT2_type =update.FT2_type
// console.log("FT2TYPE",FT2_type)
//      // console.log("TRADESTS", tradeStatuss)
//      // console.log("STATUS", status)
//      // console.log("UPDATE", update)
//      const FT1tym = new Date().toString()
//      console.log("isodate",FT1tym)

//       const newTradeHistory = new TradeHistory({
//         script_type:script_type,
//         call_type:call_type,
//         date:getCurrentDate(),
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         qty: qty,
//         active_value: active_value,
//         SL:SL,
//         sl_type:sl_type,
//         FT1: FT1,
//         FT1time:FT1tym,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         loss:loss,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatuss,
//         trl:trl,
//         tradeId:tradeId
//       })
    
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
          
//           })

//         })}else{
//           res.status(400).json({
//             status: false,
//             msg: "error",
//             error: "error",
//           });
//         }
 


//     }else if (FT2_type == "true") {
//       console.log("abcd")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)
//       let pl = (req.body.qty * 25) * (FT2 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)

//       let SL= findone.SL
//       let sl_type = findone.sl_type
//       // let FT2 = findone.FT2
//       // let FT2_type = findone.FT2_type

//       let FT3 = findone.FT3
//       let FT3_type = findone.FT3_type
        
      
//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },

//         { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type:"false",FT3, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl,call_type,date } },
//         { new: true }
//       )
//        if(update){
       
//       let status = update.status
//       let tradeStatuss = update.tradeStatus
//       let tradeId= update._id
//       console.log("TRADEID",tradeId)
//      // console.log("TRADESTS", tradeStatuss)
//      // console.log("STATUS", status)
//      // console.log("UPDATE", update)
//      let fnoindex_scrpt_name =update.fnoindex_scrpt_name
//      let call_type = update.call_type
//      const FT2tym = new Date().toString()
//      console.log("isodate",FT2tym)

//       const newTradeHistory = new TradeHistory({
//         call_type:call_type,
//         date:getCurrentDate(),
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         qty: qty,
//         active_value: active_value,
//         SL:SL,
//         sl_type:sl_type,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2time:FT2tym,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatuss,
//         trl:trl,
//         tradeId:tradeId
//       })
    
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
          
//           })

//         })}else{
//           res.status(400).json({
//             status: false,
//             msg: "error",
//             error: "error",
//           });
//         }
//       }
//       else if (FT3_type == "true") {
//         console.log("abcd")
//         investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)

//       let FT3 = parseInt(FT2) + parseInt(20)
//       console.log("FT3", FT3)

//       let SL= findone.SL
//       let sl_type = findone.sl_type
//       let pl = (req.body.qty * 25) * (FT3 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)
//       //let tradeStatus = findone.tradeStatus

//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: { sl_type: "false", FT1_type: "true", FT2_type: "true", FT3_type: "true", pl, pl_per, investment_amt, status: "Active", cstmMsg, tradeStatus, trade_type,trl,type,FT1time,FT2time,call_type,date } },
//         { new: true }

//       )
//       if(update){
//       let status = update.status
//       let tradeStatuss = update.tradeStatus
//       let tradeId= update._id
//       let type = update.type
//       console.log("TRADEID",tradeId)
//       // console.log("TRADESTS", tradeStatuss)
//       // console.log("STATUS", status)
//       // console.log("UPDATE", update)
//       let ft1_time = update.FT1time
//       console.log("FT1111111",ft1_time)

//       let fnoindex_scrpt_name =update.fnoindex_scrpt_name
//       let trade_type =update.trade_type
//       let call_type = update.call_type
//       console.log("TRADETYPE",trade_type)
//       const FT2tym = new Date().toString()
//       console.log("isodate",FT2tym)

//       const FT3tym = new Date().toString()
//       console.log("isodate",FT3tym)
//       const newTradeHistory = new TradeHistory({
//         call_type:call_type,
//         date:getCurrentDate(),
//         trade_type:trade_type,
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         qty: qty,
//         active_value: active_value,
//         sl_type:sl_type,
//         SL:SL,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2time:FT2tym,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3time:FT3tym,
//         FT3_type: FT3_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatuss,
//         trl:trl,
//         tradeId:tradeId,
//         type:type
//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             investment_amt: investment_amt,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per,
//             FT1: FT1,
//             FT1_type: FT1_type,
//             FT2: FT2,
//             FT2_type: FT2_type,
//             FT3: FT3,
//             FT3_type: FT3_type,
//             tradeStatus: tradeStatus,
//             tradeId:tradeId,
//             type:type
//           })
//           // console.log("DATA", data)
//           // console.log("UPDATE", update)

//         })
//       }else{
//         res.status(400).json({
//           status : false,
//           error : "error",
//           error : "error"
//       })
//       }
//     }
//     else if (FT4_type == "true" && FT4 == req.body.FT4){
//       console.log("BANKFT44444")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(5)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
    
    
//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)
    
//       let FT3 = parseInt(FT2) + parseInt(20)
//       console.log("FT3", FT3)
//       let FT4 = parseInt(FT3) + parseInt(20)
//       console.log("FT4", FT4)
      
    
//       let pl = (req.body.qty * 25) * (FT4 - req.body.active_value)
//       console.log("PL", pl)
    
//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)
    
//     let SL = findone.SL;
//     let sl_type = findone.sl_type;
//     //   let status = findone.status
     
//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },
    
//         { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT4, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//         { new: true }
//       )
//       if(update){
//      let status = update.status
//      let tradeStatusS = update.tradeStatus
//      let tradeId= update._id
//      console.log("TRADEID",tradeId)
//       // console.log("TRADESTS", tradeStatusS)
//       // console.log("STATUS", status)
//     console.log("UPDATE", update)
      
// let fnoindex_scrpt_name =update.fnoindex_scrpt_name

//       const FT4tym = new Date().toString()
//       console.log("isodate",FT4tym)

//       const newTradeHistory = new TradeHistory({
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         qty: qty,
//         active_value: active_value,
//         SL:SL,
//         sl_type:sl_type,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         FT4: FT4,
//         FT4time:FT4tym,
//         FT4_type: FT4_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatusS,
//         trl:trl,
//         tradeId:tradeId
//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             investment_amt: investment_amt,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per,
//             FT1: FT1,
//             FT1_type: FT1_type,
//             FT2: FT2,
//             FT2_type: FT2_type,
//             FT3: FT3,
//             FT3_type: FT3_type,
//             tradeStatus: tradeStatus,
//             tradeId:tradeId
//           })
//           // console.log("DATA", data)
//           // console.log("UPDATE", update)
    
//         })
//       }else{
//         res.status(400).json({
//           status : false,
//           error : "error",
//           error : error
//       })
//       }
//       }
//   else if ( FT5_type == "true" && FT5 == req.body.FT5){
  
//     console.log("BANKFT5555")
//     investment_amt = (req.body.qty * 25) * (req.body.active_value)
//     console.log("InvestAMT", investment_amt)
//     let av2 = parseInt(req.body.active_value) + parseInt(10)
//     console.log("AV2", av2)
//     let trl = parseInt(av2) + parseInt(10)
//     console.log("TRL", trl)
//     let FT1 = parseInt(trl) + parseInt(20)
//     console.log("FT1", FT1)
  
  
//     let FT2 = parseInt(FT1) + parseInt(20)
//     console.log("FT2", FT2)
  
//     let FT3 = parseInt(FT2) + parseInt(20)
//     console.log("FT3", FT3)
//     let FT4 = parseInt(FT3) + parseInt(20)
//     console.log("FT3", FT4)
//     let FT5 = parseInt(FT3) + parseInt(20)
//     console.log("FT5", FT5)
    
  
//     let pl = (req.body.qty * 25) * (FT5 - req.body.active_value)
//     console.log("PL", pl)
  
//     let pl_per = (pl / investment_amt * 100).toFixed(2);
//     console.log("PL%%%%", pl_per)
  
//   let SL = findone.SL;
//   let sl_type = findone.sl_type;
//   //   let status = findone.status
   
//     let update = await Alltrade.findOneAndUpdate(
//       { _id: req.params.id },
  
//       { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//       { new: true }
//     )
//     if(update){

    
//    let status = update.status
//    let tradeStatusS = update.tradeStatus
//    let tradeId= update._id
//      console.log("TRADEID",tradeId)
//      let fnoindex_scrpt_name =update.fnoindex_scrpt_name
//     // console.log("TRADESTS", tradeStatusS)
//     // console.log("STATUS", status)
//     // console.log("UPDATE", update)
//     const FT5tym = new Date().toString()
//     console.log("isodate",FT5tym)
//     const newTradeHistory = new TradeHistory({
//       fnoindex_scrpt_name:fnoindex_scrpt_name,
//       qty: qty,
//       active_value: active_value,
//       SL:SL,
//       sl_type:sl_type,
//       FT1: FT1,
//       FT1_type: FT1_type,
//       FT2: FT2,
//       FT2_type: FT2_type,
//       FT3: FT3,
//       FT3_type: FT3_type,
//       FT5: FT5,
//       FT5time:FT5tym,
//       FT5_type: FT5_type,
//       status: status,
//       pl: pl,
//       pl_per: pl_per,
//       investment_amt: investment_amt,
//       cstmMsg: cstmMsg,
//       tradeStatus: tradeStatusS,
//       trl:trl,
//       tradeId:tradeId
//     })
//     newTradeHistory
//       .save()
//       .then((data) => {
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: data,
//           investment_amt: investment_amt,
//           SL: SL,
//           PL: pl,
//           PLPER: pl_per,
//           FT1: FT1,
//           FT1_type: FT1_type,
//           FT2: FT2,
//           FT2_type: FT2_type,
  
//           FT3: FT3,
//           FT3_type: FT3_type,
//           FT5:FT5,
//           tradeStatus: tradeStatus,
//           tradeId:tradeId
//         })
//         // console.log("DATA", data)
//         // console.log("UPDATE", update)
  
//       })
//     }else{
//       res.status(400).json({
//         status : false,
//         error : "error",
//         error : error
//     })
//     }
  
//   } 
//     else if (FT6_type =="true" && FT6 == req.body.FT6){
//       console.log("BANKFT666")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)


//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)

//       let FT3 = parseInt(FT2) + parseInt(20)
//       console.log("FT3", FT3)
//       let FT5 = parseInt(FT3) + parseInt(20)
//       console.log("FT5", FT5)
//       let FT6 = parseInt(FT5) + parseInt(20)
//       console.log("FT6", FT6)

//       let pl = (req.body.qty * 25) * (FT6 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)

//    let SL = findone.SL;
//    let sl_type = findone.sl_type;
//    //   let status = findone.status
     
//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },

//         { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5,FT6, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type } },
//         { new: true }
//       )
//       if(update){
//      let status = update.status
//      let tradeStatusS = update.tradeStatus
//      let tradeId= update._id
//      console.log("TRADEID",tradeId)
//      let fnoindex_scrpt_name =update.fnoindex_scrpt_name
//       // console.log("TRADESTS", tradeStatusS)
//       // console.log("STATUS", status)
//       // console.log("UPDATE", update)
//       const FT6tym = new Date().toString()
//       console.log("isodate",FT6tym)

//       const newTradeHistory = new TradeHistory({
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         qty: qty,
//         active_value: active_value,
//         SL:SL,
//         sl_type:sl_type,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         FT5: FT5,
//         FT6:FT6,
//         FT6time:FT6tym,
//         FT6_type:FT6_type,
//         FT7:FT7,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatusS,
//         tradeId:tradeId
//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             investment_amt: investment_amt,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per,
//             FT1: FT1,
//             FT1_type: FT1_type,
//             FT2: FT2,
//             FT2_type: FT2_type,
//             FT3: FT3,
//             FT3_type: FT3_type,
//             tradeStatus: tradeStatus,
//             tradeId:tradeId
//           })
//         })
//       }else{
//         res.status(400).json({
//           status : false,
//           error : "error",
//           error : error
//       })
//       }

//     } else if ( FT7_type == "true" &&FT7 == FT7){
//       console.log("FT7777")
//       investment_amt = (req.body.qty * 25) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(10)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(10)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(20)
//       console.log("FT1", FT1)
    
    
//       let FT2 = parseInt(FT1) + parseInt(20)
//       console.log("FT2", FT2)
    
//       let FT3 = parseInt(FT2) + parseInt(20)
//       console.log("FT3", FT3)
//       let FT5 = parseInt(FT3) + parseInt(20)
//       console.log("FT5", FT5)
//       let FT6 = parseInt(FT5) + parseInt(20)
//       console.log("FT6", FT6)
//       let FT7 = parseInt(FT6) + parseInt(20)
//       console.log("FT6", FT7)
    
//       let pl = (req.body.qty * 25) * (FT6 - req.body.active_value)
//       console.log("PL", pl)
    
//       let pl_per = pl / investment_amt * 100
//       console.log("PL%%%%", pl_per)
    
//     let SL = findone.SL;
//     let sl_type = findone.sl_type;
//     //   let status = findone.status
     
//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },
    
//         { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5,FT6,FT7, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//         { new: true }
//       )
//       if(update){
//      let status = update.status
//      let tradeStatusS = update.tradeStatus
//      let fnoindex_scrpt_name =update.fnoindex_scrpt_name
//       // console.log("TRADESTS", tradeStatusS)
//       // console.log("STATUS", status)
//       // console.log("UPDATE", update)
//       const FT7tym = new Date().toString()
//       console.log("isodate",FT7tym)
//       const newTradeHistory = new TradeHistory({
//         fnoindex_scrpt_name:fnoindex_scrpt_name,
//         qty: qty,
//         active_value: active_value,
//         SL:SL,
//         sl_type:sl_type,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         FT5: FT5,
//         FT6:FT6,
//         FT7:FT7,
//         FT7time:FT7tym,
//         FT7_type: FT7_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatusS,
//         trl:trl
//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             investment_amt: investment_amt,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per,
//             FT1: FT1,
//             FT1_type: FT1_type,
//             FT2: FT2,
//             FT2_type: FT2_type,
    
//             FT3: FT3,
//             FT3_type: FT3_type,
//             tradeStatus: tradeStatus
//           })
//           // console.log("DATA", data)
//           // console.log("UPDATE", update)
    
//         })
//       }else{
//         res.status(400).json({
//           status : false,
//           error : "error",
//           error : "error"
//       })
//       }
    
//     } 

//   } else if (findone?.trade_type == "Nifty") {
// console.log("bbbbbbb")
// if (sl_type ==  "true"){
//   console.log("00000")
//   investment_amt =  (req.body.qty*50)*(req.body.active_value)
//           console.log("InvestAMT",investment_amt)


//           let SL = parseInt(req.body.active_value) -10
//           console.log("SL",SL)

//         let  pl = (req.body.qty*50) *(SL -  req.body.active_value)
//           console.log("PL",pl)

//          let pl_per = (pl/investment_amt*100).toFixed(2);
//           console.log("PL%%%%",pl_per)
//           let FT1 = findone.FT1
//           console.log("ft11111", FT1)
//           let FT1_type = findone.FT1_type
//           let FT2 = findone.FT2
//           let FT2_type = findone.FT2_type
    
//           let FT3 = findone.FT3
//           let FT3_type = findone.FT3_type
// let status = findone.status
// let tradeStatus = findone.tradeStatus
//           let update=  await Alltrade.findOneAndUpdate(
//            { _id: req.params.id },

//            {$set: {sl_type:"true",FT1_type:"false",FT2_type:"false",FT3_type:"false",pl_per,pl,investment_amt,SL,status,cstmMsg,tradeStatus}} ,

//          //{ $set: {status:"success"} },
//          { new: true }

//        )    
//      //  let status = update.status
//       // let tradeStatus = update.tradeStatus
//       //  console.log("TRADESTS", tradeStatus)
//       //  console.log("STATUS", status)
//       //  console.log("UPDATE", update)
//       let tradeId= update._id
//      console.log("TRADEID",tradeId)
//      const SlTime = new Date().toString()
//      console.log("isodate",SlTime)
//        const newTradeHistory = new TradeHistory({
//         SL: SL,
//         slTime:SlTime,
//         sl_type: sl_type,
//         qty: qty,
//         active_value: active_value,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatus,
//         tradeId:tradeId,
//         type:type
//       })
//       newTradeHistory
//       .save()
//       .then((data) => {
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: data,
//           investment_amt: investment_amt,
//           SL: SL,
//           PL: pl,
//           PLPER: pl_per,
//           FT1: FT1,
//           FT1_type: FT1_type,
//           FT2: FT2,
//           FT2_type: FT2_type,
//           FT3: FT3,
//           FT3_type: FT3_type,
//           tradeStatus: tradeStatus,
//           tradeId:tradeId,
//           type:type
//         })
//         // console.log("DATA", data)
//         // console.log("UPDATE", update)

//       })
// } else if(FT1_type == "true" && FT2_type == "true" && FT3_type == "true"){
//   console.log("11111")
//       investment_amt = (req.body.qty * 50) * (req.body.active_value)
//       console.log("InvestAMT", investment_amt)
//       let av2 = parseInt(req.body.active_value) + parseInt(5)
//       console.log("AV2", av2)
//       let trl = parseInt(av2) + parseInt(5)
//       console.log("TRL", trl)
//       let FT1 = parseInt(trl) + parseInt(10)
//       console.log("FT1", FT1)
//       let FT2 = parseInt(FT1) + parseInt(10)
//       console.log("FT2", FT2)

//       let FT3 = parseInt(FT2) + parseInt(10)
//       console.log("FT3", FT3)

//       let pl = (req.body.qty * 50) * (FT3 - req.body.active_value)
//       console.log("PL", pl)

//       let pl_per = (pl / investment_amt * 100).toFixed(2);
//       console.log("PL%%%%", pl_per)
//       //let tradeStatus = findone.tradeStatus

//       let update = await Alltrade.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type: "true", pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//         { new: true }

//       )
//       let status = update.status
//       let tradeStatuss = update.tradeStatus
//       let tradeId= update._id
//      console.log("TRADEID",tradeId)
//       // console.log("TRADESTS", tradeStatuss)
//       // console.log("STATUS", status)
//       // console.log("UPDATE", update)
//       const FT1tym = new Date().toString()
//       console.log("FT1tym ",FT1tym)
    
//       const FT2tym = new Date().toString()
//       console.log("isodate",FT2tym)

//       const FT3tym = new Date().toString()
//       console.log("isodate",FT3tym)
//       const newTradeHistory = new TradeHistory({
//         qty: qty,
//         active_value: active_value,
//         FT1: FT1,
//         FT1time:FT1tym,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2time:FT2tym,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3time:FT3tym,
//         FT3_type: FT3_type,
//         status: status,
//         pl: pl,
//         pl_per: pl_per,
//         investment_amt: investment_amt,
//         cstmMsg: cstmMsg,
//         tradeStatus: tradeStatuss,
//         trl:trl,
//         tradeId:tradeId
//       })
//       newTradeHistory
//         .save()
//         .then((data) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//             investment_amt: investment_amt,
//             SL: SL,
//             PL: pl,
//             PLPER: pl_per,
//             FT1: FT1,
//             FT1_type: FT1_type,
//             FT2: FT2,
//             FT2_type: FT2_type,
//             FT3: FT3,
//             FT3_type: FT3_type,
//             tradeStatus: tradeStatus,
//             tradeId:tradeId
//           })
//           console.log("DATA", data)
//           console.log("UPDATE", update)

//         })
// }else if (FT1_type == "true" && FT2_type == "true") {
//   console.log("22222")
//   investment_amt = (req.body.qty * 50) * (req.body.active_value)
//   console.log("InvestAMT", investment_amt)
//   let av2 = parseInt(req.body.active_value) + parseInt(5)
//   console.log("AV2", av2)
//   let trl = parseInt(av2) + parseInt(5)
//   console.log("TRL", trl)
//   let FT1 = parseInt(trl) + parseInt(10)
//   console.log("FT1", FT1)
//   let FT2 = parseInt(FT1) + parseInt(10)
//   console.log("FT2", FT2)
//   let pl = (req.body.qty * 50) * (FT2 - req.body.active_value)
//   console.log("PL", pl)

//   let pl_per = (pl / investment_amt * 100).toFixed(2);
//   console.log("PL%%%%", pl_per)

//   let update = await Alltrade.findOneAndUpdate(
//     { _id: req.params.id },

//     { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//     { new: true }
//   )
//   let status = update.status
//   let tradeStatuss = update.tradeStatus
//   let tradeId= update._id
//   console.log("TRADEID",tradeId)
//   // console.log("TRADESTS", tradeStatuss)
//   // console.log("STATUS", status)
//   // console.log("UPDATE", update)
  

//   const FT2tym = new Date().toString()
//   console.log("isodate",FT2tym)

//   const FT3tym = new Date().toString()
//   console.log("FT3tym ",FT3tym)
//   const newTradeHistory = new TradeHistory({
//     qty: qty,
//     active_value: active_value,
//     FT1: FT1,
//     FT1_type: FT1_type,
//     FT2: FT2,
//     FT2time:FT2tym,
//     FT2_type: FT2_type,
//     FT3: FT3,
//     FT3time:FT3tym,
//     FT3_type: FT3_type,
//     status: status,
//     pl: pl,
//     pl_per: pl_per,
//     investment_amt: investment_amt,
//     cstmMsg: cstmMsg,
//     tradeStatus: tradeStatuss,
//     trl:trl,
//     tradeId:tradeId
//   })
//   newTradeHistory
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
//         investment_amt: investment_amt,
//         SL: SL,
//         PL: pl,
//         PLPER: pl_per,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,

//         FT3: FT3,
//         FT3_type: FT3_type,
//         tradeStatus: tradeStatus,
//         tradeId:tradeId
//       })
//       // console.log("DATA", data)
//       // console.log("UPDATE", update)

//     })


// } else if (FT1_type == "true") {
//   console.log("3333")
//   investment_amt = (req.body.qty * 50) * (req.body.active_value)
//   console.log("InvestAMT", investment_amt)
//   let av2 = parseInt(req.body.active_value) + parseInt(5)
//   console.log("AV2", av2)
//   let trl = parseInt(av2) + parseInt(5)
//   console.log("TRL", trl)
//   let FT1 = parseInt(trl) + parseInt(10)
//   console.log("FT1", FT1)
//   let pl = (req.body.qty * 50) * (FT1 - req.body.active_value)
//   console.log("PL", pl)

//   let pl_per = (pl / investment_amt * 100).toFixed(2);
//   console.log("PL%%%%", pl_per)

//   let SL= findone.SL
//   let sl_type = findone.sl_type
//   let FT2 = findone.FT2
//   let FT2_type = findone.FT2_type

//   let FT3 = findone.FT3
//   let FT3_type = findone.FT3_type
  
//   let update = await Alltrade.findOneAndUpdate(
//     { _id: req.params.id },

//     { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//     { new: true }
//   )
//   let status = update.status
//   let tradeStatuss = update.tradeStatus
//   let tradeId= update._id
//   console.log("TRADEID",tradeId)
//   // console.log("TRADESTS", tradeStatuss)
//   // console.log("STATUS", status)
//   // console.log("UPDATE", update)
//   const FT1tym = new Date().toString()
//   console.log("isodate",FT1tym)
//   const newTradeHistory = new TradeHistory({
//     qty: qty,
//     active_value: active_value,
//     SL:SL,
//     sl_type:sl_type,
//     FT1: FT1,
//     FT1time:FT1tym,
//     FT1_type: FT1_type,
//     FT2: FT2,
//     FT2_type: FT2_type,
//     FT3: FT3,
//     FT3_type: FT3_type,
//     status: status,
//     pl: pl,
//     pl_per: pl_per,
//     investment_amt: investment_amt,
//     cstmMsg: cstmMsg,
//     tradeStatus: tradeStatuss,
//     trl:trl,
//     tradeId:tradeId
//   })
//   newTradeHistory
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
//         investment_amt: investment_amt,
//         SL: SL,
//         PL: pl,
//         PLPER: pl_per,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,

//         FT3: FT3,
//         FT3_type: FT3_type,
//         tradeStatus: tradeStatus,
//         tradeId:tradeId
//       })
//       // console.log("DATA", data)
//       // console.log("UPDATE", update)

//     })

// }else if (FT2_type == "true") {
//   console.log("abcd")
//   investment_amt = (req.body.qty * 50) * (req.body.active_value)
//   console.log("InvestAMT", investment_amt)
//   let av2 = parseInt(req.body.active_value) + parseInt(5)
//   console.log("AV2", av2)
//   let trl = parseInt(av2) + parseInt(5)
//   console.log("TRL", trl)
//   let FT1 = parseInt(trl) + parseInt(10)
//   console.log("FT1", FT1)
//   let FT2 = parseInt(FT1) + parseInt(10)
//   console.log("FT2", FT2)
//   let pl = (req.body.qty * 50) * (FT2 - req.body.active_value)
//   console.log("PL", pl)

//   let pl_per = (pl / investment_amt * 100).toFixed(2);
//   console.log("PL%%%%", pl_per)

//   let SL= findone.SL
//   let sl_type = findone.sl_type
//   // let FT2 = findone.FT2
//   // let FT2_type = findone.FT2_type

//   let FT3 = findone.FT3
//   let FT3_type = findone.FT3_type
    
  
//   let update = await Alltrade.findOneAndUpdate(
//     { _id: req.params.id },

//     { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//     { new: true }
//   )
//    if(update){
   
//   let status = update.status
//   let tradeStatuss = update.tradeStatus
//   let tradeId= update._id
//   console.log("TRADEID",tradeId)
//  // console.log("TRADESTS", tradeStatuss)
//  // console.log("STATUS", status)
//  // console.log("UPDATE", update)
//  const FT2tym = new Date().toString()
//  console.log("isodate",FT2tym)

//   const newTradeHistory = new TradeHistory({
//     qty: qty,
//     active_value: active_value,
//     SL:SL,
//     sl_type:sl_type,
//     FT1: FT1,
//     FT1_type: FT1_type,
//     FT2: FT2,
//     FT2time:FT2tym,
//     FT2_type: FT2_type,
//     FT3: FT3,
//     FT3_type: FT3_type,
//     status: status,
//     pl: pl,
//     pl_per: pl_per,
//     investment_amt: investment_amt,
//     cstmMsg: cstmMsg,
//     tradeStatus: tradeStatuss,
//     trl:trl,
//     tradeId:tradeId
//   })

//   newTradeHistory
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
      
//       })

//     })}else{
//       res.status(400).json({
//         status: false,
//         msg: "error",
//         error: "error",
//       });
//     }
//   }
//   else if (FT3_type == "true") {
//     console.log("abcd")
//     investment_amt = (req.body.qty * 50) * (req.body.active_value)
//   console.log("InvestAMT", investment_amt)
//   let av2 = parseInt(req.body.active_value) + parseInt(5)
//   console.log("AV2", av2)
//   let trl = parseInt(av2) + parseInt(5)
//   console.log("TRL", trl)
//   let FT1 = parseInt(trl) + parseInt(10)
//   console.log("FT1", FT1)
//   let FT2 = parseInt(FT1) + parseInt(10)
//   console.log("FT2", FT2)

//   let FT3 = parseInt(FT2) + parseInt(10)
//   console.log("FT3", FT3)

//   let pl = (req.body.qty * 50) * (FT3 - req.body.active_value)
//   console.log("PL", pl)

//   let pl_per = (pl / investment_amt * 100).toFixed(2);
//   console.log("PL%%%%", pl_per)
//   //let tradeStatus = findone.tradeStatus

//   let update = await Alltrade.findOneAndUpdate(
//     { _id: req.params.id },
//     { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type: "true", pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl,type } },
//     { new: true }

//   )
//   if(update){
//   let status = update.status
//   let tradeStatuss = update.tradeStatus
//   let tradeId= update._id
//   let type = update.type
//   console.log("TRADEID",tradeId)
//   // console.log("TRADESTS", tradeStatuss)
//   // console.log("STATUS", status)
//   // console.log("UPDATE", update)
//   const FT3tym = new Date().toString()
//   console.log("isodate",FT3tym)
//   const newTradeHistory = new TradeHistory({
//     qty: qty,
//     active_value: active_value,
//     FT1: FT1,
//     FT1_type: FT1_type,
//     FT2: FT2,
//     FT2_type: FT2_type,
//     FT3: FT3,
//     FT3time:FT3tym,
//     FT3_type: FT3_type,
//     status: status,
//     pl: pl,
//     pl_per: pl_per,
//     investment_amt: investment_amt,
//     cstmMsg: cstmMsg,
//     tradeStatus: tradeStatuss,
//     trl:trl,
//     tradeId:tradeId,
//     type:type
//   })
//   newTradeHistory
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
//         investment_amt: investment_amt,
//         SL: SL,
//         PL: pl,
//         PLPER: pl_per,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         tradeStatus: tradeStatus,
//         tradeId:tradeId,
//         type:type
//       })
//       // console.log("DATA", data)
//       // console.log("UPDATE", update)

//     })
//   }else{
//     res.status(400).json({
//       status : false,
//       error : "error",
//       error : error
//   })
//   }
// }
// else if (FT4_type == "false" && FT4 == req.body.FT4 ){
//     console.log("FT44444")
//     investment_amt = (req.body.qty * 50) * (req.body.active_value)
//     console.log("InvestAMT", investment_amt)
//     let av2 = parseInt(req.body.active_value) + parseInt(5)
//     console.log("AV2", av2)
//     let trl = parseInt(av2) + parseInt(5)
//     console.log("TRL", trl)
//     let FT1 = parseInt(trl) + parseInt(10)
//     console.log("FT1", FT1)
  
  
//     let FT2 = parseInt(FT1) + parseInt(10)
//     console.log("FT2", FT2)
  
//     let FT3 = parseInt(FT2) + parseInt(10)
//     console.log("FT3", FT3)
//     let FT4 = parseInt(FT3) + parseInt(10)
//     console.log("FT4", FT4)
    
  
//     let pl = (req.body.qty * 50) * (FT4 - req.body.active_value)
//     console.log("PL", pl)
  
//     let pl_per = (pl / investment_amt * 100).toFixed(2);
//     console.log("PL%%%%", pl_per)
  
//   let SL = findone.SL;
//   let sl_type = findone.sl_type;
//   //   let status = findone.status
   
//     let update = await Alltrade.findOneAndUpdate(
//       { _id: req.params.id },
  
//       { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT4, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//       { new: true }
//     )
//    let status = update.status
//    let tradeStatusS = update.tradeStatus
//    let tradeId= update._id
//   console.log("TRADEID",tradeId)
//     // console.log("TRADESTS", tradeStatusS)
//     // console.log("STATUS", status)
//     // console.log("UPDATE", update)
//     const FT4tym = new Date().toString()
//     console.log("isodate",FT4tym)
//     const newTradeHistory = new TradeHistory({
//       qty: qty,
//       active_value: active_value,
//       SL:SL,
//       sl_type:sl_type,
//       FT1: FT1,
//       FT1_type: FT1_type,
//       FT2: FT2,
//       FT2_type: FT2_type,
//       FT3: FT3,
//       FT3_type: FT3_type,
//       FT4: FT4,
//       FT4time:FT4tym,
//       FT4_type: FT4_type,
//       status: status,
//       pl: pl,
//       pl_per: pl_per,
//       investment_amt: investment_amt,
//       cstmMsg: cstmMsg,
//       tradeStatus: tradeStatusS,
//       trl:trl,
//       tradeId:tradeId
//     })
//     newTradeHistory
//       .save()
//       .then((data) => {
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: data,
//           investment_amt: investment_amt,
//           SL: SL,
//           PL: pl,
//           PLPER: pl_per,
//           FT1: FT1,
//           FT1_type: FT1_type,
//           FT2: FT2,
//           FT2_type: FT2_type,
//           FT3: FT3,
//           FT3_type: FT3_type,
//           tradeStatus: tradeStatus,
//           tradeId:tradeId
//         })
//         // console.log("DATA", data)
//         // console.log("UPDATE", update)
  
//       })
//     }
// else if ( FT5_type=="false"&&FT5 == req.body.FT5){

//   console.log("FT5555")
//   investment_amt = (req.body.qty * 50) * (req.body.active_value)
//   console.log("InvestAMT", investment_amt)
//   let av2 = parseInt(req.body.active_value) + parseInt(5)
//   console.log("AV2", av2)
//   let trl = parseInt(av2) + parseInt(5)
//   console.log("TRL", trl)
//   let FT1 = parseInt(trl) + parseInt(10)
//   console.log("FT1", FT1)


//   let FT2 = parseInt(FT1) + parseInt(10)
//   console.log("FT2", FT2)

//   let FT3 = parseInt(FT2) + parseInt(10)
//   console.log("FT3", FT3)
//   let FT5 = parseInt(FT3) + parseInt(10)
//   console.log("FT5", FT5)
  

//   let pl = (req.body.qty * 50) * (FT5 - req.body.active_value)
//   console.log("PL", pl)

//   let pl_per = (pl / investment_amt * 100).toFixed(2);
//   console.log("PL%%%%", pl_per)

// let SL = findone.SL;
// let sl_type = findone.sl_type;
// //   let status = findone.status
 
//   let update = await Alltrade.findOneAndUpdate(
//     { _id: req.params.id },

//     { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//     { new: true }
//   )
//  let status = update.status
//  let tradeStatusS = update.tradeStatus
//  let tradeId= update._id
//   console.log("TRADEID",tradeId)
//   // console.log("TRADESTS", tradeStatusS)
//   // console.log("STATUS", status)
//   // console.log("UPDATE", update)
//   const FT5tym = new Date().toString()
//   console.log("isodate",FT5tym)
//   const newTradeHistory = new TradeHistory({
//     qty: qty,
//     active_value: active_value,
//     SL:SL,
//     sl_type:sl_type,
//     FT1: FT1,
//     FT1_type: FT1_type,
//     FT2: FT2,
//     FT2_type: FT2_type,
//     FT3: FT3,
//     FT3_type: FT3_type,
//     FT5: FT5,
//     FT5time:FT5tym,
//     FT5_type:FT5_type,
//     status: status,
//     pl: pl,
//     pl_per: pl_per,
//     investment_amt: investment_amt,
//     cstmMsg: cstmMsg,
//     tradeStatus: tradeStatusS,
//     trl:trl,
//     tradeId:tradeId
//   })
//   newTradeHistory
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
//         investment_amt: investment_amt,
//         SL: SL,
//         PL: pl,
//         PLPER: pl_per,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         FT5:FT5,
//         tradeStatus: tradeStatus,
//         tradeId:tradeId
//       })
//       // console.log("DATA", data)
//       // console.log("UPDATE", update)

//     })

// } 
// else if (FT6_type =="false" &&FT6 == req.body.FT6){
//   console.log("FT6666")
//   investment_amt = (req.body.qty * 50) * (req.body.active_value)
//   console.log("InvestAMT", investment_amt)
//   let av2 = parseInt(req.body.active_value) + parseInt(5)
//   console.log("AV2", av2)
//   let trl = parseInt(av2) + parseInt(5)
//   console.log("TRL", trl)
//   let FT1 = parseInt(trl) + parseInt(10)
//   console.log("FT1", FT1)


//   let FT2 = parseInt(FT1) + parseInt(10)
//   console.log("FT2", FT2)

//   let FT3 = parseInt(FT2) + parseInt(10)
//   console.log("FT3", FT3)
//   let FT5 = parseInt(FT3) + parseInt(10)
//   console.log("FT5", FT5)
//   let FT6 = parseInt(FT5) + parseInt(10)
//   console.log("FT6", FT6)

//   let pl = (req.body.qty * 50) * (FT6 - req.body.active_value)
//   console.log("PL", pl)

//   let pl_per = (pl / investment_amt * 100).toFixed(2);
//   console.log("PL%%%%", pl_per)

// let SL = findone.SL;
// let sl_type = findone.sl_type;
// //   let status = findone.status
 
//   let update = await Alltrade.findOneAndUpdate(
//     { _id: req.params.id },

//     { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5,FT6, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//     { new: true }
//   )
//  let status = update.status
//  let tradeStatusS = update.tradeStatus
//  let tradeId= update._id
//   console.log("TRADEID",tradeId)
//   // console.log("TRADESTS", tradeStatusS)
//   // console.log("STATUS", status)
//   // console.log("UPDATE", update)
//   const FT6tym = new Date().toString()
//   console.log("isodate",FT6tym)

//   const newTradeHistory = new TradeHistory({
//     qty: qty,
//     active_value: active_value,
//     SL:SL,
//     sl_type:sl_type,
//     FT1: FT1,
//     FT1_type: FT1_type,
//     FT2: FT2,
//     FT2_type: FT2_type,
//     FT3: FT3,
//     FT3_type: FT3_type,
//     FT5: FT5,
//     FT6:FT6,
//     FT6time:FT6tym,
//     FT6_type:FT6_type,
//     status: status,
//     pl: pl,
//     pl_per: pl_per,
//     investment_amt: investment_amt,
//     cstmMsg: cstmMsg,
//     tradeStatus: tradeStatusS,
//     trl:trl,
//     tradeId:tradeId
//   })
//   newTradeHistory
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
//         investment_amt: investment_amt,
//         SL: SL,
//         PL: pl,
//         PLPER: pl_per,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         tradeStatus: tradeStatus,
//         tradeId:tradeId
//       })
//       // console.log("DATA", data)
//       // console.log("UPDATE", update)

//     })

// } 

// else if ( FT7_type == "false" &&FT7 == FT7){
//   console.log("FT7777")
//   investment_amt = (req.body.qty * 50) * (req.body.active_value)
//   console.log("InvestAMT", investment_amt)
//   let av2 = parseInt(req.body.active_value) + parseInt(5)
//   console.log("AV2", av2)
//   let trl = parseInt(av2) + parseInt(5)
//   console.log("TRL", trl)
//   let FT1 = parseInt(trl) + parseInt(10)
//   console.log("FT1", FT1)


//   let FT2 = parseInt(FT1) + parseInt(10)
//   console.log("FT2", FT2)

//   let FT3 = parseInt(FT2) + parseInt(10)
//   console.log("FT3", FT3)
//   let FT5 = parseInt(FT3) + parseInt(10)
//   console.log("FT5", FT5)
//   let FT6 = parseInt(FT5) + parseInt(10)
//   console.log("FT6", FT6)
//   let FT7 = parseInt(FT6) + parseInt(10)
//   console.log("FT6", FT7)

//   let pl = (req.body.qty * 50) * (FT6 - req.body.active_value)
//   console.log("PL", pl)

//   let pl_per = (pl / investment_amt * 100).toFixed(2);
//   console.log("PL%%%%", pl_per)

// let SL = findone.SL;
// let sl_type = findone.sl_type;
// //   let status = findone.status
 
//   let update = await Alltrade.findOneAndUpdate(
//     { _id: req.params.id },

//     { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5,FT6,FT7, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
//     { new: true }
//   )
//  let status = update.status
//  let tradeStatusS = update.tradeStatus
//  let tradeId= update._id
//  console.log("TRADEID",tradeId)
//   // console.log("TRADESTS", tradeStatusS)
//   // console.log("STATUS", status)
//   // console.log("UPDATE", update)
//   const FT7tym = new Date().toString()
//   console.log("isodate",FT7tym)
//   const newTradeHistory = new TradeHistory({
//     qty: qty,
//     active_value: active_value,
//     SL:SL,
//     sl_type:sl_type,
//     FT1: FT1,
//     FT1_type: FT1_type,
//     FT2: FT2,
//     FT2_type: FT2_type,
//     FT3: FT3,
//     FT3_type: FT3_type,
//     FT5: FT5,
//     FT6:FT6,
//     FT7:FT7,
//     FT7time:FT7tym,
//     status: status,
//     pl: pl,
//     pl_per: pl_per,
//     investment_amt: investment_amt,
//     cstmMsg: cstmMsg,
//     tradeStatus: tradeStatusS,
//     trl:trl,
//     tradeId:tradeId
//   })
//   newTradeHistory
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
//         investment_amt: investment_amt,
//         SL: SL,
//         PL: pl,
//         PLPER: pl_per,
//         FT1: FT1,
//         FT1_type: FT1_type,
//         FT2: FT2,
//         FT2_type: FT2_type,
//         FT3: FT3,
//         FT3_type: FT3_type,
//         tradeStatus: tradeStatus,
//         tradeId:tradeId
//       })
//       // console.log("DATA", data)
//       // console.log("UPDATE", update)

//     })

// } 
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });

//   }
// }


exports.tradeHistory = async (req, res) => {
  const findall = await TradeHistory.find({tradeId:req.params.id}).sort({ sortorder: 1 })
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.searchTradeBydate = async(req,res)=>{

}



// var start = new Date();
// start.setHours(0,0,0,0);
// var end = new Date();
// end.setHours(23,59,59,999);

// Data.find({userId: decode.id,created: {$gte: start, $lt: end}},function(err,data){
//     if(err){
//         reject(err);
//     }

// created:{
//   type:Date,
//   default:Date.now
// }


// let today = new Date();
// today.setHours(0, 0, 0, 0)
// let first = today.getDate() - today.getDay();
// let last = first + 6;
// let firstday = new Date(today.setDate(first)).toUTCString();
// let lastday = new Date(today.setDate(last)).toUTCString();
// let firstDayMonth = new Date(today.setDate(1));
// let lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
// lastDayMonth.setHours(23, 59, 59, 0);
// today = new Date().setHours(0, 0, 0, 0);


exports.dateSrchFltr = async (req, res) => {
  await Alltrade.find({ date:req.params.date })
 
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

 

exports.getweekdaywisedata = async (req, res) => {


  let qq=new Date(new Date().setFullYear(new Date().getFullYear() ))
//  let qq1=new Date(new Date().setFullYear(new Date().getFullYear() ))
 // let qq=new Date(new Date().setFullYear(new Date().setFullYear() + 1))
  console.log("QQQQ",qq)
  const date1 = ("0" + qq.getDate()).slice(-2);
  console.log("date1",date1)
  const month = ("0" + (qq.getMonth() + 1)).slice(-2);
  const year = qq.getFullYear();
//let det= `${date1}-${month}-${year}`
 

//console.log("ffffff",det)

 let date2 = ("0" + qq.getDate()-1) ;
 console.log("DATE2",date2)
//const date2 = ("0" + qq.getDate()).slice(-2);
const month2 = ("0" + (qq.getMonth() + 1)).slice(-2);
const year2 = qq.getFullYear();
let det2= `${date2}-${month2}-${year2}`

console.log("ffffff",det2) 

let date3 = ("0" + qq.getDate()-2) ;
console.log("DATE2",date2)
//const date2 = ("0" + qq.getDate()).slice(-2);
const month3 = ("0" + (qq.getMonth() + 1)).slice(-2);
const year3 = qq.getFullYear();
let det3= `${date3}-${month3}-${year3}`
console.log("ffffff3",det3)

let date4 = ("0" + qq.getDate()-3) ;
console.log("DATE2",date2)
//const date2 = ("0" + qq.getDate()).slice(-2);
const month4 = ("0" + (qq.getMonth() + 1)).slice(-2);
const year4 = qq.getFullYear();
let det4= `${date4}-${month4}-${year4}`
console.log("ffffff4",det4)

let d = new Date();
let ddd =d.toLocaleDateString()
console.log('Today is: ' + d.toLocaleDateString());
d.setDate(d.getDate() - 3);
console.log('3 days ago was: ' + d.toLocaleDateString());

var tomorrow = moment(ddd).format('MM-DD-YYYY');
console.log("DDD",tomorrow)
var fDate = moment(ddd).format('DD-MM-YYYY');
console.log("FDATE",fDate)

// let sevendayago = today.setDate(today.getDate() - 1);
// console.log("7",new Date(sevendayago));
// console.log("7",new Date(sevendayago).getDay());


//   let getCurrentDate = function () {
//     const t = new Date();
//     const date = ("0" + t.getDate()).slice(-2);
//     const month = ("0" + (t.getMonth() + 1)).slice(-2);
//     const year = t.getFullYear();
//     return `${date}-${month}-${year}`;
//   };
//   let de = getCurrentDate()
//   console.log("DE",de)
// // Declare and store the data into a variable
// // Declare and store the data into a variable
// const currDate =  getCurrentDate()
// console.log("&&",currDate)
// // Prints the UNIX epoch
// console.log("Unix time stamp of current date", currDate);
// var time = currDate.setDate(de)
// console.log("^^^^^",time)
// // Converts timestamp into Date Object
// const dt = new Date(currDate)
// console.log("****",dt)
// // Print the day of the month
// console.log("###",dt.getDate())

 
 

  let today = new Date();
  console.log(today);
  console.log(today.getDay());


  let onedayago = today.setDate(today.getDate() - 1);
  console.log("ONE",new Date(onedayago));
  console.log("1",new Date(onedayago).getDay());

  let todaydata = await TradeHistory.find({ date:new Date(onedayago) })
  console.log("TODAY",todaydata)
  

   

  let twodayago = today.setDate(today.getDate() - 1);
  console.log(new Date(twodayago));
  console.log(new Date(twodayago).getDay());

  let threedayago = today.setDate(today.getDate() - 1);
  console.log(new Date(threedayago));
  console.log(new Date(threedayago).getDay());

  let fourdayago = today.setDate(today.getDate() - 1);
  console.log(new Date(fourdayago));
  console.log(new Date(fourdayago).getDay());

  let fivedayago = today.setDate(today.getDate() - 1);
  console.log(new Date(fivedayago));
  console.log(new Date(fivedayago).getDay());

  let sixdayago = today.setDate(today.getDate() - 1);
  console.log(new Date(sixdayago));
  console.log(new Date(sixdayago).getDay());

  let sevendayago = today.setDate(today.getDate() - 1);
  console.log("7",new Date(sevendayago));
  console.log("7",new Date(sevendayago).getDay());

  // let onedayagocount = await Cdrreport.count({
  //   $and: [
  //     { caller_id_name: req.params.id},
  //     {
  //       createdAt: {
  //         $gte: new Date(onedayago)
  //       }
  //     }
  //   ]
  // });

  // let twodayagocount = await Cdrreport.count({
  //   $and: [
  //     { caller_id_name: req.params.id },
  //     {
  //       createdAt: {
  //         $gte: new Date(twodayago),
  //         $lt: new Date(onedayago)
  //       }
  //     }
  //   ]
  // });

  // let threedayagocount = await Cdrreport.count({
  //   $and: [
  //     { caller_id_name: req.params.id },
  //     {
  //       createdAt: {
  //         $gte: new Date(threedayago),
  //         $lt: new Date(twodayago)
  //       }
  //     }
  //   ]
  // });

  // let fourdayagocount = await Cdrreport.count({
  //   $and: [
  //     { caller_id_name: req.params.id },
  //     {
  //       createdAt: {
  //         $gte: new Date(fourdayago),
  //         $lt: new Date(threedayago)
  //       }
  //     }
  //   ]
  // });

  // let fivedayagocount = await Cdrreport.count({
  //   $and: [
  //     { caller_id_name: req.params.id },
  //     {
  //       createdAt: {
  //         $gte: new Date(fivedayago),
  //         $lt: new Date(fourdayago)
  //       }
  //     }
  //   ]
  // });

  // let sixdayagocount = await Cdrreport.count({
  //   $and: [
  //     { caller_id_name: req.params.id },
  //     {
  //       createdAt: {
  //         $gte: new Date(sixdayago),
  //         $lt: new Date(fivedayago)
  //       }
  //     }
  //   ]
  // });

  // let sevendayagocount = await Cdrreport.count({
  //   $and: [
  //     { caller_id_name: req.params.id },
  //     {
  //       createdAt: {
  //         $gte: new Date(sevendayago),
  //         $lt: new Date(sixdayago)
  //       }
  //     }
  //   ]
  // });

  res.json({
    onedayagoweekday: new Date(onedayago).getDay(),
    onedayagocalls: onedayagocount,
    twodayagoweekday: new Date(twodayago).getDay(),
    twodayagocalls: twodayagocount,
    threedayagoweekday: new Date(threedayago).getDay(),
    threedayagocalls: threedayagocount,
    fourdayagoweekday: new Date(fourdayago).getDay(),
    fourdayagocalls: fourdayagocount,
    fivedayagoweekday: new Date(fivedayago).getDay(),
    fivedayagocalls: fivedayagocount,
    sixdayagoweekday: new Date(sixdayago).getDay(),
    sixdayagocalls: sixdayagocount,
    sevendayagoweekday: new Date(sevendayago).getDay(),
    sevendayagocalls: sevendayagocount
  });

   
  
 
};


exports.today_profit_loss = async (req, res) => {
//     let getCurrentDate = function () {
//     const t = new Date();
//     const date = ("0" + t.getDate()).slice(-2);
//     const month = ("0" + (t.getMonth() + 1)).slice(-2);
//     const year = t.getFullYear();
//     return `${date}-${month}-${year}`;
//   };
//   let de = getCurrentDate()
//   console.log("DE",de)
//  let today = await TradeHistory.find({ date:de })
//   console.log("TODAY",today)
   

let d = new Date();
console.log('Today is: ' + d.toLocaleDateString());
var today = moment(d).format('DD-MM-YYYY');
console.log("Today",today)
 
  let getdate= await Alltrade.find({ date:today })
  console.log("TODAY",today)
  
    var newarrToday = getdate.map(function (value) {
        return value.pl;
      });
      console.log("New Array",newarrToday);
       sumprofit = _.sumBy([...newarrToday]);
      console.log("Today PROFIT",sumprofit); 
    
    
      var newarrToday = getdate.map(function (value) {
        return value.loss;
      });
      console.log("New Array",newarrToday);
       
       sumloss = _.sumBy([...newarrToday]);
        
      console.log("LOSS",sumloss);
      
    let total_prft_loss = 0;
      total_prft_loss =sumprofit + sumloss
      console.log("ajj ka TOTAL PROFIT LOSS",total_prft_loss)
   
      res.status(200).json({
        status:true,
       msg:"success",
        sumprofit:sumprofit,
        sumloss:sumloss,
        total_prft_loss:total_prft_loss
      
      })
 
//   var newarr = today.map(function (value) {
//       return value.pl;
//     });
//     console.log(newarr);
//     let sumprofit = _.sumBy([...newarr]);
//     console.log(sumprofit); 


//     var newarr2 = today.map(function (value) {
//       return value.loss;
//     });
//     console.log(newarr2);
     
//      sumloss = _.sumBy([...newarr2]);
      
//     console.log(sumloss);
    
//  let total_prft_loss = 0;
//     total_prft_loss =sumprofit + sumloss
//     console.log("TOTAL PROFIT LOSS",total_prft_loss)

//     res.status(200).json({
//       status:true,
//       msg:"success",
//       date :de,
//       Profit:sumprofit,
//       Loss:sumloss,
//       total_prft_loss:total_prft_loss

//   })
  
  
  
}

  
  
 
exports.editFnoindex = async (req, res) => {
  const { fnoindex_scrpt_name,active_value, trade_type, SL, sl_type, FT1_type, FT2, FT2_type, FT3, FT3_type,FT4_type, FT5, FT5_type, FT4,FT6, FT6_type, FT7, FT7_type, qty, cstmMsg, status, tradeStatus,trl, pl, pl_per,type,FT1time,FT2time,call_type,date,script_type,loss, loss_per } = req.body

  let findone = await Alltrade.findOne({ _id: req.params.id })
//console.log("FINFONE",findone)
let invest_amt = findone.investment_amt
console.log("INVESTAMT",invest_amt)
let Qty =findone.qty
console.log("QTY",Qty)
let Av1 = findone.active_value
console.log("Av1",Av1)

let active_value2 = findone.active_value2
console.log("Av2",active_value2)

let ft1 = findone.FT1
console.log("FT1",ft1)

let ft2 = findone.FT2
console.log("FT2",ft2)

let ft3 = findone.FT3
console.log("FT3",ft3)

const FT1tym = new Date().toString()
      console.log("FT1tym",FT1tym)

      const FT2tym = new Date().toString()
           console.log("FT2tym",FT2tym)
           const FT3tym = new Date().toString()
           console.log("FT3tym",FT2tym)
           const FT4tym = new Date().toString()
           console.log("FT4tym",FT4tym)
           const FT5tym = new Date().toString()
           console.log("FT5tym",FT5tym)
           const FT6tym = new Date().toString()
           console.log("FT6tym",FT6tym)
           const FT7tym = new Date().toString()
           console.log("FT7tym",FT7tym)


  if (findone?.trade_type == "BankNifty") {
    console.log("chala gya")
    if (req.body.sl_type == "true") {
console.log("sahi h")

let sl = findone.SL
  let loss = (Qty*25) *(sl - Av1)
  console.log("Loss",loss)
        let loss_per = (loss / invest_amt * 100).toFixed(2)
       console.log("LOSS %", loss_per)

  const sltym = new Date().toString()
  console.log("isodate",sltym)
         let update = await Alltrade.findOneAndUpdate(
            { _id: req.params.id },
            { $set: {sl_type: "true",status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus,loss:loss,loss_per:loss_per,slTime:sltym} },
            { new: true }
          )
          .then((data) => resp.successr(res, data))
          .catch((error) => resp.errorr(res, error));
        //  console.log("Update",update)

    }else if (FT1_type == "true" && FT2_type == "true" && FT3_type == "true") {
      console.log("FT1_TYPE,FT2_TYPE","FT3_TYPE")
      let pl = (Qty * 25) * (ft3 -Av1  )
      console.log("Profit", pl)

      let pl_per = (pl /invest_amt * 100).toFixed(2);
      console.log("PL %%", pl_per)
      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {sl_type: "false",FT3_type:req.body.FT3_type,status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus,pl,pl_per ,FT1time:FT1tym,FT2time:FT2tym, FT3time:FT3tym, } },
        { new: true }
      )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
    }else if (FT1_type == "true" && FT2_type == "true") {
      console.log("FT1_TYPE,FT2_TYPE")
      let pl = (Qty * 25) * (ft2 -Av1  )
      console.log("Profit", pl)

      let pl_per = (pl /invest_amt * 100).toFixed(2);
      console.log("PL %%", pl_per)
      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {sl_type: "false",FT2_type:req.body.FT2_type,status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus,pl,pl_per , FT1time:FT1tym,FT2time:FT2tym } },
        { new: true }
      )
      
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));

    } else if(FT1_type == "true"){
      console.log("FT1_TYPE")
      let pl = (Qty * 25) * (ft1 -Av1  )
            console.log("Profit", pl)
      
            let pl_per = (pl /invest_amt * 100).toFixed(2);
            console.log("PL %%", pl_per)
            let update = await Alltrade.findOneAndUpdate(
              { _id: req.params.id },
              { $set: {sl_type: "false",FT1_type:req.body.FT1_type,status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus,pl,pl_per , FT1time:FT1tym, } },
              { new: true }
            )
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
    }else if(FT2_type == "true"){
      console.log("FT2_TYPE")
      let pl = (Qty * 25) * (ft2 -Av1  )
            console.log("Profit", pl)
      
            let pl_per = (pl /invest_amt * 100).toFixed(2);
            console.log("PL %%", pl_per)
            let update = await Alltrade.findOneAndUpdate(
              { _id: req.params.id },
              { $set: {sl_type: "false",FT2_type:req.body.FT2_type,status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus,pl,pl_per , FT2time:FT2tym, } },
              { new: true }
            )
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
    }else if(FT3_type == "true"){
      console.log("FT3_TYPE")
      let pl = (Qty * 25) * (ft3 -Av1  )
            console.log("Profit", pl)
      
            let pl_per = (pl /invest_amt * 100).toFixed(2);
            console.log("PL %%", pl_per)
            let update = await Alltrade.findOneAndUpdate(
              { _id: req.params.id },
              { $set: {sl_type: "false",FT3_type:req.body.FT3_type,status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus,pl,pl_per , FT3time:FT3tym, } },
              { new: true }
            )
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
    }else if(FT4_type == "false" && FT4 == req.body.FT4){
      console.log("FT4_TYPE")
      let ft4 = parseInt(ft3) + parseInt(20)
           console.log("FT4", FT4)

           let pl = (Qty * 25) * (ft4 -Av1  )
           console.log("Profit", pl)
     
           let pl_per = (pl /invest_amt * 100).toFixed(2);
           console.log("PL %%", pl_per)
           let update = await Alltrade.findOneAndUpdate(
             { _id: req.params.id },
             { $set: {sl_type: "false",FT4_type:req.body.FT3_type,status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus,pl,pl_per , FT4time:FT4tym, } },
             { new: true }
           )
           .then((data) => resp.successr(res, data))
           .catch((error) => resp.errorr(res, error));

    }

  }
  
}


//maunally t4,t6,t7


exports.weekely_profit_loss = async (req, res) => {
  let d = new Date();
  console.log('Today is: ' + d.toLocaleDateString());
  var today = moment(d).format('DD-MM-YYYY');
  console.log("Today",today)

var onedayago = d.setDate(d.getDate() -1)
//console.log("ONE DAY AGO",onedayago)
var onedayagodate =moment(onedayago).format('DD-MM-YYYY')
console.log("onedayagodate",onedayagodate)

let dd =new Date();
var twodayago = dd.setDate(dd.getDate()-2)
var twodayagodate = moment(twodayago).format('DD-MM-YYYY')
console.log("twodayagodate",twodayagodate)

let ddd = new Date()
var threedayago = ddd.setDate(ddd.getDate()-3)
var threedayagodate = moment(threedayago).format('DD-MM-YYYY')
console.log("threedayagodate",threedayagodate)


let dddd = new Date()
var fourdayago = dddd.setDate(dddd.getDate()-4)
var fourdayagodate = moment(fourdayago).format('DD-MM-YYYY')
console.log("fourdayagodate",fourdayagodate)

let ddddd = new Date()
var fivedayago = ddddd.setDate(ddddd.getDate()-5)
var fivedayagodate = moment(fivedayago).format('DD-MM-YYYY')
console.log("fivedayagodate",fivedayagodate)

let dddddd = new Date()
var sixdayago = dddddd.setDate(dddddd.getDate()-6)
var sixdayagodate = moment(sixdayago).format('DD-MM-YYYY')
console.log("sixdayagodate",sixdayagodate)

   let getdate= await Alltrade.find({ date:today })
  console.log("TODAY",today)
  
    var newarrToday = getdate.map(function (value) {
        return value.pl;
      });
      console.log("New Array",newarrToday);
       sumprofit = _.sumBy([...newarrToday]);
      console.log("Today PROFIT",sumprofit); 
    
    
      var newarrToday = getdate.map(function (value) {
        return value.loss;
      });
      console.log("New Array",newarrToday);
       
       sumloss = _.sumBy([...newarrToday]);
        
      console.log("LOSS",sumloss);
      
    let total_prft_loss = 0;
      total_prft_loss =sumprofit + sumloss
      console.log("ajj ka TOTAL PROFIT LOSS",total_prft_loss)
    
     
    


  let getdate1= await Alltrade.find({ date:onedayagodate })
  console.log("onedayagodate",getdate1)
  
    var newarr1 = getdate1.map(function (value) {
        return value.pl;
      });
      console.log("New Array",newarr1);
      let sumprofit1 = _.sumBy([...newarr1]);
      console.log("PROFIT11",sumprofit1); 
    
    
      var newarr1 = getdate1.map(function (value) {
        return value.loss;
      });
      console.log("New Array",newarr1);
       
       sumloss1 = _.sumBy([...newarr1]);
        
      console.log("LOSS11",sumloss1);
      
    let total_prft_loss1 = 0;
      total_prft_loss1 =sumprofit1 + sumloss1
      console.log("TOTAL PROFIT LOSS",total_prft_loss1)
     
    

  let getdate2= await Alltrade.find({ date:twodayagodate })
  console.log("twodayagodate",getdate2)
  
    var newarr2 = getdate2.map(function (value) {
        return value.pl;
      });
      console.log("New Array",newarr2);
      let sumprofit2 = _.sumBy([...newarr2]);
      console.log("PROFIT",sumprofit2); 
    
    
      var newarr2 = getdate2.map(function (value) {
        return value.loss;
      });
      console.log(newarr2);
       
       sumloss2 = _.sumBy([...newarr2]);
        
      console.log("LOSS5",sumloss2);
      
    let total_prft_loss2 = 0;
      total_prft_loss2 =sumprofit2 + sumloss2
      console.log("TOTAL PROFIT LOSS",total_prft_loss2)
    
       
    

  let getdate3= await Alltrade.find({ date:threedayagodate })
  console.log("threedayagodate",getdate3)
  
    var newarr3 = getdate3.map(function (value) {
        return value.pl;
      });
      console.log("New Array",newarr3);
      let sumprofit3 = _.sumBy([...newarr3]);
      console.log("PROFIT",sumprofit3); 
    
    
      var newarr3 = getdate3.map(function (value) {
        return value.loss;
      });
      console.log(newarr3);
       
       sumloss3 = _.sumBy([...newarr3]);
        
      console.log("LOSS5",sumloss3);
      
    let total_prft_loss3 = 0;
      total_prft_loss3 =sumprofit3 + sumloss3
      console.log("TOTAL PROFIT LOSS",total_prft_loss3)
    
     
    

  let getdate4= await Alltrade.find({ date:fourdayagodate })
  console.log("fourdayagodate",getdate4)
  
  
    var newarr4 = getdate4.map(function (value) {
        return value.pl;
      });
      console.log("New Array",newarr4);
      let sumprofit4 = _.sumBy([...newarr4]);
      console.log("PROFIT",sumprofit4); 
    
    
      var newarr4 = getdate4.map(function (value) {
        return value.loss;
      });
      console.log(newarr4);
       
       sumloss4 = _.sumBy([...newarr4]);
        
      console.log("LOSS5",sumloss4);
      
    let total_prft_loss4 = 0;
      total_prft_loss4 =sumprofit4 + sumloss4
      console.log("TOTAL PROFIT LOSS",total_prft_loss4)
    
   
    


  let getdate5= await Alltrade.find({ date:fivedayagodate })
  console.log("fivedayagodate",getdate5)
  
    var newarr5 = getdate5.map(function (value) {
        return value.pl;
      });
      console.log("New Array",newarr5);
      let sumprofit5 = _.sumBy([...newarr5]);
      console.log("PROFIT",sumprofit5); 
    
    
      var newarr5 = getdate5.map(function (value) {
        return value.loss;
      });
      console.log(newarr5);
       
       sumloss5 = _.sumBy([...newarr5]);
        
      console.log("LOSS5",sumloss5);
      
    let total_prft_loss5 = 0;
      total_prft_loss5 =sumprofit5 + sumloss5
      console.log("TOTAL PROFIT LOSS",total_prft_loss5)
    
    
    

  let getdate6= await Alltrade.find({ date:sixdayagodate })
  console.log("sixdayagodate",getdate6)

 // console.log("TODAY",today)
var newarr = getdate6.map(function (value) {
    return value.pl;
  });
  console.log("New Array",newarr);
  let sumprofit6 = _.sumBy([...newarr]);
  console.log("PROFIT",sumprofit6); 


  var newarr6 = getdate.map(function (value) {
    return value.loss;
  });
  console.log(newarr2);
   
   sumloss6 = _.sumBy([...newarr6]);
    
  console.log("LOSS",sumloss6);
  
let total_prft_loss6 = 0;
  total_prft_loss =sumprofit6 + sumloss6
  console.log("TOTAL PROFIT LOSS",total_prft_loss6)


  //let sumprofit = _.sumBy([...newarrToday]);
 let total7daysprofit =  sumprofit + sumprofit1 + sumprofit2 +
  sumprofit3 + sumprofit4 + sumprofit5 + sumprofit6
 console.log("7 days ka Profit",total7daysprofit)

let total7daysloss = sumloss + sumloss1 + sumloss2  + sumloss3 + sumloss4 + sumloss5 + sumloss6
 
console.log("7 days ka loss ",total7daysloss)

let weekly_profit_loss = total7daysprofit - total7daysloss
console.log("WEEKLY LOSS PROFIT  ",weekly_profit_loss)

res.status(200).json({
  status:true,
  msg:"success",
  total7daysprofit:total7daysprofit,
  total7daysloss:total7daysloss,
  weekly_profit_loss:weekly_profit_loss

})
 

}