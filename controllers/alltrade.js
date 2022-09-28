const Alltrade = require("../models/alltrade");
const resp = require("../helpers/apiResponse");
const TradeHistory = require("../models/tradeHistory");
const CstmMsg = require("../models/cstm_msg");

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
        //    const makertradehistory = await TradeHistory.create(newTradeHistory);
        //   console.log("MMMMMM",makertradehistory)
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
      error: error
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
  await TradeHistory.find({}).populate("fnoindex_scrpt_name").populate("fnoequty_scrpt_name").populate("cash_scrpt_name").populate("expiryDate").populate("tradeId")
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



exports.editFnoindex = async (req, res) => {
  const { active_value, trade_type, SL, sl_type, FT1_type, FT2, FT2_type, FT3, FT3_type,FT4_type, FT5, FT5_type, FT4,FT6, FT6_type, FT7, FT7_type, qty, cstmMsg, status, tradeStatus,trl, pl, pl_per,type } = req.body

  let findone = await Alltrade.findOne({ trade_type: trade_type })
 // console.log("FINDONE", findone)


  if (findone?.trade_type == "BankNifty") {
    if (sl_type == "true") {
      investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let SL = parseInt(req.body.active_value) - 20
      console.log("SL", SL)
      let pl = (req.body.qty * 25) * (SL - req.body.active_value)
      console.log("PL", pl)
      let pl_per = (pl / investment_amt * 100).toFixed(2)
      console.log("PL%%%%", pl_per)
      let FT1 = findone.FT1
      console.log("ft11111", FT1)
      let FT1_type = findone.FT1_type
      let FT2 = findone.FT2
      let FT2_type = findone.FT2_type

      let FT3 = findone.FT3
      let FT3_type = findone.FT3_type
      let type = findone.type
      let fnoindex_scrpt_name = findone.fnoindex_scrpt_name
      let script_type = findone.script_type
      let active_value2 = findone.active_value2
      let call_type = findone.call_type
      let active_value = findone.active_value
     // console.log("TRADEID",tradeId)
     let tradeStatus = findone.tradeStatus
     let qty = findone.qty
let no_of_lots = findone.no_of_lots
let trl = findone.trl
      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { SL, sl_type: "true", pl, pl_per, investment_amt, status: "Active", cstmMsg, tradeStatus:req.body.tradeStatus, trade_type ,type,fnoindex_scrpt_name} },
        { new: true }
      )
      if(update){
      let status = update.status
      let tradeId= update._id
      console.log("TRADEID",tradeId)
    let trdests = update.tradeStatus
 
 
//let getCurrentDate = function () {
  const sltym = new Date().toString()
  
  console.log("isodate",sltym)

//   const date = ("0" + t.getDate()).slice(-2);
//   const month = ("0" + (t.getMonth() + 1)).slice(-2);
//   const year = t.getFullYear();
//   const hour = t.getHours();
//   var ampm = hour >= 12 ? 'PM' : 'AM';
//   const minute = t.getMinutes();
//   const second = t.getSeconds();
//  // var minutes = minute < 10 ? '0'+ minutes : minutes
//   return `${date}/${month}/${year} ${hour}:${minute}:${second} ${ampm}`;
// };
 
// var today = new Date();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

     // let type = update.type
   //  console.log("TRADESTS", tradeStatus)
   //   console.log("STATUS", status)
     // console.log("UPDATE", update)

      const newTradeHistory = new TradeHistory({

        SL: SL,
        slTime:sltym,
        script_type:script_type,
        findone:findone,
        active_value2:active_value2,
        fnoindex_scrpt_name:fnoindex_scrpt_name,
        qty:qty,
        no_of_lots:no_of_lots,
        trl :trl,
        call_type:call_type,
        sl_type: sl_type,
        qty: qty,
        active_value: active_value,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: trdests,
        tradeId:tradeId,
        type:type
      })
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            investment_amt: investment_amt,
            SL: SL,
            PL: pl,
            PLPER: pl_per,
            FT1: FT1,
            FT1_type: FT1_type,
            FT2: FT2,
            FT2_type: FT2_type,
            FT3: FT3,
            FT3_type: FT3_type,
            tradeStatus: trdests,
            tradeId:tradeId,
            type:type
          })
        
          // console.log("DATA", data)
          // console.log("UPDATE", update)

        })
      }else{
        res.status(400).json({
          status : false,
          error : "error",
          error : error
      })
      }

    } else if (FT1_type == "true" && FT2_type == "true" && FT3_type == "true") {
      console.log("ABCD")
      investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(10)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(20)
      console.log("FT1", FT1)
      let FT2 = parseInt(FT1) + parseInt(20)
      console.log("FT2", FT2)

      let FT3 = parseInt(FT2) + parseInt(20)
      console.log("FT3", FT3)

      let pl = (req.body.qty * 25) * (FT3 - req.body.active_value)
      console.log("PL", pl)

      let pl_per = (pl / investment_amt * 100).toFixed(2);
      console.log("PL%%%%", pl_per)
      //let tradeStatus = findone.tradeStatus

      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type: "true", pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl,type } },
        { new: true }

      )
      if(update){
      let status = update.status
      let tradeStatuss = update.tradeStatus
      let tradeId= update._id
      let type = update.type
      console.log("TRADEID",tradeId)
      // console.log("TRADESTS", tradeStatuss)
      // console.log("STATUS", status)
      // console.log("UPDATE", update)
      const FT1tym = new Date().toString()
      console.log("FT1tym ",FT1tym)
    
      const FT2tym = new Date().toString()
      console.log("isodate",FT2tym)

      const FT3tym = new Date().toString()
      console.log("isodate",FT3tym)
      const newTradeHistory = new TradeHistory({


        qty: qty,
        active_value: active_value,
        FT1: FT1,
        FT1time:FT1tym,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2time:FT2tym,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3time:FT3tym,
        FT3_type: FT3_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatuss,
        trl:trl,
        tradeId:tradeId,
        type:type
      })
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            investment_amt: investment_amt,
            SL: SL,
            PL: pl,
            PLPER: pl_per,
            FT1: FT1,
            FT1_type: FT1_type,
            FT2: FT2,
            FT2_type: FT2_type,
            FT3: FT3,
            FT3_type: FT3_type,
            tradeStatus: tradeStatus,
            tradeId:tradeId,
            type:type
          })
          // console.log("DATA", data)
          // console.log("UPDATE", update)

        })
      }else{
        res.status(400).json({
          status : false,
          error : "error",
          error : error
      })
      }

    } else if (FT1_type == "true" && FT2_type == "true") {
      console.log("EFGH")
      investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(10)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(20)
      console.log("FT1", FT1)
      let FT2 = parseInt(FT1) + parseInt(20)
      console.log("FT2", FT2)
      let pl = (req.body.qty * 25) * (FT2 - req.body.active_value)
      console.log("PL", pl)

      let pl_per = (pl / investment_amt * 100).toFixed(2);
      console.log("PL%%%%", pl_per)

      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },

        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
        { new: true }
      )
      if(update){
      let status = update.status
      let tradeStatuss = update.tradeStatus
      let tradeId= update._id
      console.log("TRADEID",tradeId)
      // console.log("TRADESTS", tradeStatuss)
      // console.log("STATUS", status)
      // console.log("UPDATE", update)
      const FT1tym = new Date().toString()
      console.log("FT1tym ",FT1tym)

      const FT2tym = new Date().toString()
      console.log("FT2tym",FT2tym)

      const newTradeHistory = new TradeHistory({        
        qty: qty,
        active_value: active_value,
        FT1: FT1,
        FT1time:FT1tym,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2time:FT2tym,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatuss,
        tradeId:tradeId
      })
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            investment_amt: investment_amt,
            SL: SL,
            PL: pl,
            PLPER: pl_per,
            FT1: FT1,
            FT1_type: FT1_type,
            FT2: FT2,
            FT2_type: FT2_type,

            FT3: FT3,
            FT3_type: FT3_type,
            tradeStatus: tradeStatus,
            trl:trl,
            tradeId:tradeId
          })
          // console.log("DATA", data)
          // console.log("UPDATE", update)

        })
      }else{
        res.status(400).json({
          status : false,
          error : "error",
          error : error
      })
      }


    } else if (FT1_type == "true") {
      console.log("abcd")
      investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(10)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(20)
      console.log("FT1", FT1)
      let pl = (req.body.qty * 25) * (FT1 - req.body.active_value)
      console.log("PL", pl)

      let pl_per = (pl / investment_amt * 100).toFixed(2);
      console.log("PL%%%%", pl_per)

      let SL= findone.SL
      let sl_type = findone.sl_type
      let FT2 = findone.FT2
      let FT2_type = findone.FT2_type

      let FT3 = findone.FT3
      let FT3_type = findone.FT3_type
        
      
      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },

        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
        { new: true }
      )
       if(update){
       
      let status = update.status
      let tradeStatuss = update.tradeStatus
      let tradeId= update._id
      console.log("TRADEID",tradeId)
     // console.log("TRADESTS", tradeStatuss)
     // console.log("STATUS", status)
     // console.log("UPDATE", update)
     const FT1tym = new Date().toString()
     console.log("isodate",FT1tym)

      const newTradeHistory = new TradeHistory({
        qty: qty,
        active_value: active_value,
        SL:SL,
        sl_type:sl_type,
        FT1: FT1,
        FT1time:FT1tym,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatuss,
        trl:trl,
        tradeId:tradeId
      })
    
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
          
          })

        })}else{
          res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
          });
        }
 


    }else if (FT2_type == "true") {
      console.log("abcd")
      investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(10)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(20)
      console.log("FT1", FT1)
      let FT2 = parseInt(FT1) + parseInt(20)
      console.log("FT2", FT2)
      let pl = (req.body.qty * 25) * (FT2 - req.body.active_value)
      console.log("PL", pl)

      let pl_per = (pl / investment_amt * 100).toFixed(2);
      console.log("PL%%%%", pl_per)

      let SL= findone.SL
      let sl_type = findone.sl_type
      // let FT2 = findone.FT2
      // let FT2_type = findone.FT2_type

      let FT3 = findone.FT3
      let FT3_type = findone.FT3_type
        
      
      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },

        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
        { new: true }
      )
       if(update){
       
      let status = update.status
      let tradeStatuss = update.tradeStatus
      let tradeId= update._id
      console.log("TRADEID",tradeId)
     // console.log("TRADESTS", tradeStatuss)
     // console.log("STATUS", status)
     // console.log("UPDATE", update)
     const FT2tym = new Date().toString()
     console.log("isodate",FT2tym)

      const newTradeHistory = new TradeHistory({
        qty: qty,
        active_value: active_value,
        SL:SL,
        sl_type:sl_type,
        FT1: FT1,
       
        FT1_type: FT1_type,
        FT2: FT2,
        FT2time:FT2tym,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatuss,
        trl:trl,
        tradeId:tradeId
      })
    
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
          
          })

        })}else{
          res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
          });
        }
      }
      else if (FT3_type == "true") {
        console.log("abcd")
        investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(10)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(20)
      console.log("FT1", FT1)
      let FT2 = parseInt(FT1) + parseInt(20)
      console.log("FT2", FT2)

      let FT3 = parseInt(FT2) + parseInt(20)
      console.log("FT3", FT3)

      let pl = (req.body.qty * 25) * (FT3 - req.body.active_value)
      console.log("PL", pl)

      let pl_per = (pl / investment_amt * 100).toFixed(2);
      console.log("PL%%%%", pl_per)
      //let tradeStatus = findone.tradeStatus

      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type: "true", pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl,type } },
        { new: true }

      )
      if(update){
      let status = update.status
      let tradeStatuss = update.tradeStatus
      let tradeId= update._id
      let type = update.type
      console.log("TRADEID",tradeId)
      // console.log("TRADESTS", tradeStatuss)
      // console.log("STATUS", status)
      // console.log("UPDATE", update)
      const FT3tym = new Date().toString()
      console.log("isodate",FT3tym)
      const newTradeHistory = new TradeHistory({
        qty: qty,
        active_value: active_value,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3time:FT3tym,
        FT3_type: FT3_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatuss,
        trl:trl,
        tradeId:tradeId,
        type:type
      })
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            investment_amt: investment_amt,
            SL: SL,
            PL: pl,
            PLPER: pl_per,
            FT1: FT1,
            FT1_type: FT1_type,
            FT2: FT2,
            FT2_type: FT2_type,
            FT3: FT3,
            FT3_type: FT3_type,
            tradeStatus: tradeStatus,
            tradeId:tradeId,
            type:type
          })
          // console.log("DATA", data)
          // console.log("UPDATE", update)

        })
      }else{
        res.status(400).json({
          status : false,
          error : "error",
          error : error
      })
      }
    }
    else if (FT4_type == "false" && FT4 == req.body.FT4){
      console.log("BANKFT44444")
      investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(5)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(10)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(20)
      console.log("FT1", FT1)
    
    
      let FT2 = parseInt(FT1) + parseInt(20)
      console.log("FT2", FT2)
    
      let FT3 = parseInt(FT2) + parseInt(20)
      console.log("FT3", FT3)
      let FT4 = parseInt(FT3) + parseInt(20)
      console.log("FT4", FT4)
      
    
      let pl = (req.body.qty * 25) * (FT4 - req.body.active_value)
      console.log("PL", pl)
    
      let pl_per = (pl / investment_amt * 100).toFixed(2);
      console.log("PL%%%%", pl_per)
    
    let SL = findone.SL;
    let sl_type = findone.sl_type;
    //   let status = findone.status
     
      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
    
        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT4, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
        { new: true }
      )
      if(update){
     let status = update.status
     let tradeStatusS = update.tradeStatus
     let tradeId= update._id
     console.log("TRADEID",tradeId)
      // console.log("TRADESTS", tradeStatusS)
      // console.log("STATUS", status)
      // console.log("UPDATE", update)
      const FT4tym = new Date().toString()
      console.log("isodate",FT4tym)

      const newTradeHistory = new TradeHistory({
        qty: qty,
        active_value: active_value,
        SL:SL,
        sl_type:sl_type,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        FT4: FT4,
        FT4time:FT4tym,
        FT4_type: FT4_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatusS,
        trl:trl,
        tradeId:tradeId
      })
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            investment_amt: investment_amt,
            SL: SL,
            PL: pl,
            PLPER: pl_per,
            FT1: FT1,
            FT1_type: FT1_type,
            FT2: FT2,
            FT2_type: FT2_type,
            FT3: FT3,
            FT3_type: FT3_type,
            tradeStatus: tradeStatus,
            tradeId:tradeId
          })
          // console.log("DATA", data)
          // console.log("UPDATE", update)
    
        })
      }else{
        res.status(400).json({
          status : false,
          error : "error",
          error : error
      })
      }
      }
  else if ( FT5_type == "false" && FT5 == req.body.FT5){
  
    console.log("BANKFT5555")
    investment_amt = (req.body.qty * 25) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)
    let av2 = parseInt(req.body.active_value) + parseInt(10)
    console.log("AV2", av2)
    let trl = parseInt(av2) + parseInt(10)
    console.log("TRL", trl)
    let FT1 = parseInt(trl) + parseInt(20)
    console.log("FT1", FT1)
  
  
    let FT2 = parseInt(FT1) + parseInt(20)
    console.log("FT2", FT2)
  
    let FT3 = parseInt(FT2) + parseInt(20)
    console.log("FT3", FT3)
    let FT4 = parseInt(FT3) + parseInt(20)
    console.log("FT3", FT4)
    let FT5 = parseInt(FT3) + parseInt(20)
    console.log("FT5", FT5)
    
  
    let pl = (req.body.qty * 25) * (FT5 - req.body.active_value)
    console.log("PL", pl)
  
    let pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)
  
  let SL = findone.SL;
  let sl_type = findone.sl_type;
  //   let status = findone.status
   
    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },
  
      { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
      { new: true }
    )
    if(update){

    
   let status = update.status
   let tradeStatusS = update.tradeStatus
   let tradeId= update._id
     console.log("TRADEID",tradeId)
    // console.log("TRADESTS", tradeStatusS)
    // console.log("STATUS", status)
    // console.log("UPDATE", update)
    const FT5tym = new Date().toString()
    console.log("isodate",FT5tym)
    const newTradeHistory = new TradeHistory({
      qty: qty,
      active_value: active_value,
      SL:SL,
      sl_type:sl_type,
      FT1: FT1,
      FT1_type: FT1_type,
      FT2: FT2,
      FT2_type: FT2_type,
      FT3: FT3,
      FT3_type: FT3_type,
      FT5: FT5,
      FT5time:FT5tym,
      FT5_type: FT5_type,
      status: status,
      pl: pl,
      pl_per: pl_per,
      investment_amt: investment_amt,
      cstmMsg: cstmMsg,
      tradeStatus: tradeStatusS,
      trl:trl,
      tradeId:tradeId
    })
    newTradeHistory
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
          investment_amt: investment_amt,
          SL: SL,
          PL: pl,
          PLPER: pl_per,
          FT1: FT1,
          FT1_type: FT1_type,
          FT2: FT2,
          FT2_type: FT2_type,
  
          FT3: FT3,
          FT3_type: FT3_type,
          FT5:FT5,
          tradeStatus: tradeStatus,
          tradeId:tradeId
        })
        // console.log("DATA", data)
        // console.log("UPDATE", update)
  
      })
    }else{
      res.status(400).json({
        status : false,
        error : "error",
        error : error
    })
    }
  
  } 
    else if (FT6_type =="false" && FT6 == req.body.FT6){
      console.log("BANKFT666")
      investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(10)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(20)
      console.log("FT1", FT1)


      let FT2 = parseInt(FT1) + parseInt(20)
      console.log("FT2", FT2)

      let FT3 = parseInt(FT2) + parseInt(20)
      console.log("FT3", FT3)
      let FT5 = parseInt(FT3) + parseInt(20)
      console.log("FT5", FT5)
      let FT6 = parseInt(FT5) + parseInt(20)
      console.log("FT6", FT6)

      let pl = (req.body.qty * 25) * (FT6 - req.body.active_value)
      console.log("PL", pl)

      let pl_per = (pl / investment_amt * 100).toFixed(2);
      console.log("PL%%%%", pl_per)

   let SL = findone.SL;
   let sl_type = findone.sl_type;
   //   let status = findone.status
     
      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },

        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5,FT6, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type } },
        { new: true }
      )
      if(update){
     let status = update.status
     let tradeStatusS = update.tradeStatus
     let tradeId= update._id
     console.log("TRADEID",tradeId)
      // console.log("TRADESTS", tradeStatusS)
      // console.log("STATUS", status)
      // console.log("UPDATE", update)
      const FT6tym = new Date().toString()
      console.log("isodate",FT6tym)

      const newTradeHistory = new TradeHistory({
        qty: qty,
        active_value: active_value,
        SL:SL,
        sl_type:sl_type,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        FT5: FT5,
        FT6:FT6,
        FT6time:FT6tym,
        FT6_type:FT6_type,
        FT7:FT7,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatusS,
        tradeId:tradeId
      })
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            investment_amt: investment_amt,
            SL: SL,
            PL: pl,
            PLPER: pl_per,
            FT1: FT1,
            FT1_type: FT1_type,
            FT2: FT2,
            FT2_type: FT2_type,
            FT3: FT3,
            FT3_type: FT3_type,
            tradeStatus: tradeStatus,
            tradeId:tradeId
          })
        })
      }else{
        res.status(400).json({
          status : false,
          error : "error",
          error : error
      })
      }

    } else if ( FT7_type == "false" &&FT7 == FT7){
      console.log("FT7777")
      investment_amt = (req.body.qty * 25) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(10)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(20)
      console.log("FT1", FT1)
    
    
      let FT2 = parseInt(FT1) + parseInt(20)
      console.log("FT2", FT2)
    
      let FT3 = parseInt(FT2) + parseInt(20)
      console.log("FT3", FT3)
      let FT5 = parseInt(FT3) + parseInt(20)
      console.log("FT5", FT5)
      let FT6 = parseInt(FT5) + parseInt(20)
      console.log("FT6", FT6)
      let FT7 = parseInt(FT6) + parseInt(20)
      console.log("FT6", FT7)
    
      let pl = (req.body.qty * 25) * (FT6 - req.body.active_value)
      console.log("PL", pl)
    
      let pl_per = pl / investment_amt * 100
      console.log("PL%%%%", pl_per)
    
    let SL = findone.SL;
    let sl_type = findone.sl_type;
    //   let status = findone.status
     
      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
    
        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5,FT6,FT7, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
        { new: true }
      )
      if(update){
     let status = update.status
     let tradeStatusS = update.tradeStatus
      // console.log("TRADESTS", tradeStatusS)
      // console.log("STATUS", status)
      // console.log("UPDATE", update)
      const FT7tym = new Date().toString()
      console.log("isodate",FT7tym)
      const newTradeHistory = new TradeHistory({
        qty: qty,
        active_value: active_value,
        SL:SL,
        sl_type:sl_type,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        FT5: FT5,
        FT6:FT6,
        FT7:FT7,
        FT7time:FT7tym,
        FT7_type: FT7_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatusS,
        trl:trl
      })
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            investment_amt: investment_amt,
            SL: SL,
            PL: pl,
            PLPER: pl_per,
            FT1: FT1,
            FT1_type: FT1_type,
            FT2: FT2,
            FT2_type: FT2_type,
    
            FT3: FT3,
            FT3_type: FT3_type,
            tradeStatus: tradeStatus
          })
          // console.log("DATA", data)
          // console.log("UPDATE", update)
    
        })
      }else{
        res.status(400).json({
          status : false,
          error : "error",
          error : error
      })
      }
    
    } 

  } else if (findone?.trade_type == "Nifty") {
console.log("bbbbbbb")
if (sl_type ==  "true"){
  console.log("00000")
  investment_amt =  (req.body.qty*50)*(req.body.active_value)
          console.log("InvestAMT",investment_amt)


          let SL = parseInt(req.body.active_value) -10
          console.log("SL",SL)

        let  pl = (req.body.qty*50) *(SL -  req.body.active_value)
          console.log("PL",pl)

         let pl_per = (pl/investment_amt*100).toFixed(2);
          console.log("PL%%%%",pl_per)
          let FT1 = findone.FT1
          console.log("ft11111", FT1)
          let FT1_type = findone.FT1_type
          let FT2 = findone.FT2
          let FT2_type = findone.FT2_type
    
          let FT3 = findone.FT3
          let FT3_type = findone.FT3_type
let status = findone.status
let tradeStatus = findone.tradeStatus
          let update=  await Alltrade.findOneAndUpdate(
           { _id: req.params.id },

           {$set: {sl_type:"true",FT1_type:"false",FT2_type:"false",FT3_type:"false",pl_per,pl,investment_amt,SL,status,cstmMsg,tradeStatus}} ,

         //{ $set: {status:"success"} },
         { new: true }

       )    
     //  let status = update.status
      // let tradeStatus = update.tradeStatus
      //  console.log("TRADESTS", tradeStatus)
      //  console.log("STATUS", status)
      //  console.log("UPDATE", update)
      let tradeId= update._id
     console.log("TRADEID",tradeId)
     const SlTime = new Date().toString()
     console.log("isodate",SlTime)
       const newTradeHistory = new TradeHistory({
        SL: SL,
        slTime:SlTime,
        sl_type: sl_type,
        qty: qty,
        active_value: active_value,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatus,
        tradeId:tradeId,
        type:type
      })
      newTradeHistory
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
          investment_amt: investment_amt,
          SL: SL,
          PL: pl,
          PLPER: pl_per,
          FT1: FT1,
          FT1_type: FT1_type,
          FT2: FT2,
          FT2_type: FT2_type,
          FT3: FT3,
          FT3_type: FT3_type,
          tradeStatus: tradeStatus,
          tradeId:tradeId,
          type:type
        })
        // console.log("DATA", data)
        // console.log("UPDATE", update)

      })
} else if(FT1_type == "true" && FT2_type == "true" && FT3_type == "true"){
  console.log("11111")
      investment_amt = (req.body.qty * 50) * (req.body.active_value)
      console.log("InvestAMT", investment_amt)
      let av2 = parseInt(req.body.active_value) + parseInt(5)
      console.log("AV2", av2)
      let trl = parseInt(av2) + parseInt(5)
      console.log("TRL", trl)
      let FT1 = parseInt(trl) + parseInt(10)
      console.log("FT1", FT1)
      let FT2 = parseInt(FT1) + parseInt(10)
      console.log("FT2", FT2)

      let FT3 = parseInt(FT2) + parseInt(10)
      console.log("FT3", FT3)

      let pl = (req.body.qty * 50) * (FT3 - req.body.active_value)
      console.log("PL", pl)

      let pl_per = (pl / investment_amt * 100).toFixed(2);
      console.log("PL%%%%", pl_per)
      //let tradeStatus = findone.tradeStatus

      let update = await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type: "true", pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
        { new: true }

      )
      let status = update.status
      let tradeStatuss = update.tradeStatus
      let tradeId= update._id
     console.log("TRADEID",tradeId)
      // console.log("TRADESTS", tradeStatuss)
      // console.log("STATUS", status)
      // console.log("UPDATE", update)
      const FT1tym = new Date().toString()
      console.log("FT1tym ",FT1tym)
    
      const FT2tym = new Date().toString()
      console.log("isodate",FT2tym)

      const FT3tym = new Date().toString()
      console.log("isodate",FT3tym)
      const newTradeHistory = new TradeHistory({
        qty: qty,
        active_value: active_value,
        FT1: FT1,
        FT1time:FT1tym,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2time:FT2tym,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3time:FT3tym,
        FT3_type: FT3_type,
        status: status,
        pl: pl,
        pl_per: pl_per,
        investment_amt: investment_amt,
        cstmMsg: cstmMsg,
        tradeStatus: tradeStatuss,
        trl:trl,
        tradeId:tradeId
      })
      newTradeHistory
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            investment_amt: investment_amt,
            SL: SL,
            PL: pl,
            PLPER: pl_per,
            FT1: FT1,
            FT1_type: FT1_type,
            FT2: FT2,
            FT2_type: FT2_type,
            FT3: FT3,
            FT3_type: FT3_type,
            tradeStatus: tradeStatus,
            tradeId:tradeId
          })
          console.log("DATA", data)
          console.log("UPDATE", update)

        })
}else if (FT1_type == "true" && FT2_type == "true") {
  console.log("22222")
  investment_amt = (req.body.qty * 50) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)
  let av2 = parseInt(req.body.active_value) + parseInt(5)
  console.log("AV2", av2)
  let trl = parseInt(av2) + parseInt(5)
  console.log("TRL", trl)
  let FT1 = parseInt(trl) + parseInt(10)
  console.log("FT1", FT1)
  let FT2 = parseInt(FT1) + parseInt(10)
  console.log("FT2", FT2)
  let pl = (req.body.qty * 50) * (FT2 - req.body.active_value)
  console.log("PL", pl)

  let pl_per = (pl / investment_amt * 100).toFixed(2);
  console.log("PL%%%%", pl_per)

  let update = await Alltrade.findOneAndUpdate(
    { _id: req.params.id },

    { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
    { new: true }
  )
  let status = update.status
  let tradeStatuss = update.tradeStatus
  let tradeId= update._id
  console.log("TRADEID",tradeId)
  // console.log("TRADESTS", tradeStatuss)
  // console.log("STATUS", status)
  // console.log("UPDATE", update)
  

  const FT2tym = new Date().toString()
  console.log("isodate",FT2tym)

  const FT3tym = new Date().toString()
  console.log("FT3tym ",FT3tym)
  const newTradeHistory = new TradeHistory({
    qty: qty,
    active_value: active_value,
    FT1: FT1,
    FT1_type: FT1_type,
    FT2: FT2,
    FT2time:FT2tym,
    FT2_type: FT2_type,
    FT3: FT3,
    FT3time:FT3tym,
    FT3_type: FT3_type,
    status: status,
    pl: pl,
    pl_per: pl_per,
    investment_amt: investment_amt,
    cstmMsg: cstmMsg,
    tradeStatus: tradeStatuss,
    trl:trl,
    tradeId:tradeId
  })
  newTradeHistory
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
        investment_amt: investment_amt,
        SL: SL,
        PL: pl,
        PLPER: pl_per,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,

        FT3: FT3,
        FT3_type: FT3_type,
        tradeStatus: tradeStatus,
        tradeId:tradeId
      })
      // console.log("DATA", data)
      // console.log("UPDATE", update)

    })


} else if (FT1_type == "true") {
  console.log("3333")
  investment_amt = (req.body.qty * 50) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)
  let av2 = parseInt(req.body.active_value) + parseInt(5)
  console.log("AV2", av2)
  let trl = parseInt(av2) + parseInt(5)
  console.log("TRL", trl)
  let FT1 = parseInt(trl) + parseInt(10)
  console.log("FT1", FT1)
  let pl = (req.body.qty * 50) * (FT1 - req.body.active_value)
  console.log("PL", pl)

  let pl_per = (pl / investment_amt * 100).toFixed(2);
  console.log("PL%%%%", pl_per)

  let SL= findone.SL
  let sl_type = findone.sl_type
  let FT2 = findone.FT2
  let FT2_type = findone.FT2_type

  let FT3 = findone.FT3
  let FT3_type = findone.FT3_type
  
  let update = await Alltrade.findOneAndUpdate(
    { _id: req.params.id },

    { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
    { new: true }
  )
  let status = update.status
  let tradeStatuss = update.tradeStatus
  let tradeId= update._id
  console.log("TRADEID",tradeId)
  // console.log("TRADESTS", tradeStatuss)
  // console.log("STATUS", status)
  // console.log("UPDATE", update)
  const FT1tym = new Date().toString()
  console.log("isodate",FT1tym)
  const newTradeHistory = new TradeHistory({
    qty: qty,
    active_value: active_value,
    SL:SL,
    sl_type:sl_type,
    FT1: FT1,
    FT1time:FT1tym,
    FT1_type: FT1_type,
    FT2: FT2,
    FT2_type: FT2_type,
    FT3: FT3,
    FT3_type: FT3_type,
    status: status,
    pl: pl,
    pl_per: pl_per,
    investment_amt: investment_amt,
    cstmMsg: cstmMsg,
    tradeStatus: tradeStatuss,
    trl:trl,
    tradeId:tradeId
  })
  newTradeHistory
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
        investment_amt: investment_amt,
        SL: SL,
        PL: pl,
        PLPER: pl_per,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,

        FT3: FT3,
        FT3_type: FT3_type,
        tradeStatus: tradeStatus,
        tradeId:tradeId
      })
      // console.log("DATA", data)
      // console.log("UPDATE", update)

    })

}else if (FT2_type == "true") {
  console.log("abcd")
  investment_amt = (req.body.qty * 50) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)
  let av2 = parseInt(req.body.active_value) + parseInt(5)
  console.log("AV2", av2)
  let trl = parseInt(av2) + parseInt(5)
  console.log("TRL", trl)
  let FT1 = parseInt(trl) + parseInt(10)
  console.log("FT1", FT1)
  let FT2 = parseInt(FT1) + parseInt(10)
  console.log("FT2", FT2)
  let pl = (req.body.qty * 50) * (FT2 - req.body.active_value)
  console.log("PL", pl)

  let pl_per = (pl / investment_amt * 100).toFixed(2);
  console.log("PL%%%%", pl_per)

  let SL= findone.SL
  let sl_type = findone.sl_type
  // let FT2 = findone.FT2
  // let FT2_type = findone.FT2_type

  let FT3 = findone.FT3
  let FT3_type = findone.FT3_type
    
  
  let update = await Alltrade.findOneAndUpdate(
    { _id: req.params.id },

    { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
    { new: true }
  )
   if(update){
   
  let status = update.status
  let tradeStatuss = update.tradeStatus
  let tradeId= update._id
  console.log("TRADEID",tradeId)
 // console.log("TRADESTS", tradeStatuss)
 // console.log("STATUS", status)
 // console.log("UPDATE", update)
 const FT2tym = new Date().toString()
 console.log("isodate",FT2tym)

  const newTradeHistory = new TradeHistory({
    qty: qty,
    active_value: active_value,
    SL:SL,
    sl_type:sl_type,
    FT1: FT1,
    FT1_type: FT1_type,
    FT2: FT2,
    FT2time:FT2tym,
    FT2_type: FT2_type,
    FT3: FT3,
    FT3_type: FT3_type,
    status: status,
    pl: pl,
    pl_per: pl_per,
    investment_amt: investment_amt,
    cstmMsg: cstmMsg,
    tradeStatus: tradeStatuss,
    trl:trl,
    tradeId:tradeId
  })

  newTradeHistory
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      
      })

    })}else{
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  }
  else if (FT3_type == "true") {
    console.log("abcd")
    investment_amt = (req.body.qty * 50) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)
  let av2 = parseInt(req.body.active_value) + parseInt(5)
  console.log("AV2", av2)
  let trl = parseInt(av2) + parseInt(5)
  console.log("TRL", trl)
  let FT1 = parseInt(trl) + parseInt(10)
  console.log("FT1", FT1)
  let FT2 = parseInt(FT1) + parseInt(10)
  console.log("FT2", FT2)

  let FT3 = parseInt(FT2) + parseInt(10)
  console.log("FT3", FT3)

  let pl = (req.body.qty * 50) * (FT3 - req.body.active_value)
  console.log("PL", pl)

  let pl_per = (pl / investment_amt * 100).toFixed(2);
  console.log("PL%%%%", pl_per)
  //let tradeStatus = findone.tradeStatus

  let update = await Alltrade.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type: "true", FT2, FT3_type: "true", pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl,type } },
    { new: true }

  )
  if(update){
  let status = update.status
  let tradeStatuss = update.tradeStatus
  let tradeId= update._id
  let type = update.type
  console.log("TRADEID",tradeId)
  // console.log("TRADESTS", tradeStatuss)
  // console.log("STATUS", status)
  // console.log("UPDATE", update)
  const FT3tym = new Date().toString()
  console.log("isodate",FT3tym)
  const newTradeHistory = new TradeHistory({
    qty: qty,
    active_value: active_value,
    FT1: FT1,
    FT1_type: FT1_type,
    FT2: FT2,
    FT2_type: FT2_type,
    FT3: FT3,
    FT3time:FT3tym,
    FT3_type: FT3_type,
    status: status,
    pl: pl,
    pl_per: pl_per,
    investment_amt: investment_amt,
    cstmMsg: cstmMsg,
    tradeStatus: tradeStatuss,
    trl:trl,
    tradeId:tradeId,
    type:type
  })
  newTradeHistory
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
        investment_amt: investment_amt,
        SL: SL,
        PL: pl,
        PLPER: pl_per,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        tradeStatus: tradeStatus,
        tradeId:tradeId,
        type:type
      })
      // console.log("DATA", data)
      // console.log("UPDATE", update)

    })
  }else{
    res.status(400).json({
      status : false,
      error : "error",
      error : error
  })
  }
}
else if (FT4_type == "false" && FT4 == req.body.FT4 ){
    console.log("FT44444")
    investment_amt = (req.body.qty * 50) * (req.body.active_value)
    console.log("InvestAMT", investment_amt)
    let av2 = parseInt(req.body.active_value) + parseInt(5)
    console.log("AV2", av2)
    let trl = parseInt(av2) + parseInt(5)
    console.log("TRL", trl)
    let FT1 = parseInt(trl) + parseInt(10)
    console.log("FT1", FT1)
  
  
    let FT2 = parseInt(FT1) + parseInt(10)
    console.log("FT2", FT2)
  
    let FT3 = parseInt(FT2) + parseInt(10)
    console.log("FT3", FT3)
    let FT4 = parseInt(FT3) + parseInt(10)
    console.log("FT4", FT4)
    
  
    let pl = (req.body.qty * 50) * (FT4 - req.body.active_value)
    console.log("PL", pl)
  
    let pl_per = (pl / investment_amt * 100).toFixed(2);
    console.log("PL%%%%", pl_per)
  
  let SL = findone.SL;
  let sl_type = findone.sl_type;
  //   let status = findone.status
   
    let update = await Alltrade.findOneAndUpdate(
      { _id: req.params.id },
  
      { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT4, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
      { new: true }
    )
   let status = update.status
   let tradeStatusS = update.tradeStatus
   let tradeId= update._id
  console.log("TRADEID",tradeId)
    // console.log("TRADESTS", tradeStatusS)
    // console.log("STATUS", status)
    // console.log("UPDATE", update)
    const FT4tym = new Date().toString()
    console.log("isodate",FT4tym)
    const newTradeHistory = new TradeHistory({
      qty: qty,
      active_value: active_value,
      SL:SL,
      sl_type:sl_type,
      FT1: FT1,
      FT1_type: FT1_type,
      FT2: FT2,
      FT2_type: FT2_type,
      FT3: FT3,
      FT3_type: FT3_type,
      FT4: FT4,
      FT4time:FT4tym,
      FT4_type: FT4_type,
      status: status,
      pl: pl,
      pl_per: pl_per,
      investment_amt: investment_amt,
      cstmMsg: cstmMsg,
      tradeStatus: tradeStatusS,
      trl:trl,
      tradeId:tradeId
    })
    newTradeHistory
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
          investment_amt: investment_amt,
          SL: SL,
          PL: pl,
          PLPER: pl_per,
          FT1: FT1,
          FT1_type: FT1_type,
          FT2: FT2,
          FT2_type: FT2_type,
          FT3: FT3,
          FT3_type: FT3_type,
          tradeStatus: tradeStatus,
          tradeId:tradeId
        })
        // console.log("DATA", data)
        // console.log("UPDATE", update)
  
      })
    }
else if ( FT5_type=="false"&&FT5 == req.body.FT5){

  console.log("FT5555")
  investment_amt = (req.body.qty * 50) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)
  let av2 = parseInt(req.body.active_value) + parseInt(5)
  console.log("AV2", av2)
  let trl = parseInt(av2) + parseInt(5)
  console.log("TRL", trl)
  let FT1 = parseInt(trl) + parseInt(10)
  console.log("FT1", FT1)


  let FT2 = parseInt(FT1) + parseInt(10)
  console.log("FT2", FT2)

  let FT3 = parseInt(FT2) + parseInt(10)
  console.log("FT3", FT3)
  let FT5 = parseInt(FT3) + parseInt(10)
  console.log("FT5", FT5)
  

  let pl = (req.body.qty * 50) * (FT5 - req.body.active_value)
  console.log("PL", pl)

  let pl_per = (pl / investment_amt * 100).toFixed(2);
  console.log("PL%%%%", pl_per)

let SL = findone.SL;
let sl_type = findone.sl_type;
//   let status = findone.status
 
  let update = await Alltrade.findOneAndUpdate(
    { _id: req.params.id },

    { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
    { new: true }
  )
 let status = update.status
 let tradeStatusS = update.tradeStatus
 let tradeId= update._id
  console.log("TRADEID",tradeId)
  // console.log("TRADESTS", tradeStatusS)
  // console.log("STATUS", status)
  // console.log("UPDATE", update)
  const FT5tym = new Date().toString()
  console.log("isodate",FT5tym)
  const newTradeHistory = new TradeHistory({
    qty: qty,
    active_value: active_value,
    SL:SL,
    sl_type:sl_type,
    FT1: FT1,
    FT1_type: FT1_type,
    FT2: FT2,
    FT2_type: FT2_type,
    FT3: FT3,
    FT3_type: FT3_type,
    FT5: FT5,
    FT5time:FT5tym,
    FT5_type:FT5_type,
    status: status,
    pl: pl,
    pl_per: pl_per,
    investment_amt: investment_amt,
    cstmMsg: cstmMsg,
    tradeStatus: tradeStatusS,
    trl:trl,
    tradeId:tradeId
  })
  newTradeHistory
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
        investment_amt: investment_amt,
        SL: SL,
        PL: pl,
        PLPER: pl_per,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        FT5:FT5,
        tradeStatus: tradeStatus,
        tradeId:tradeId
      })
      // console.log("DATA", data)
      // console.log("UPDATE", update)

    })

} 
else if (FT6_type =="false" &&FT6 == req.body.FT6){
  console.log("FT6666")
  investment_amt = (req.body.qty * 50) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)
  let av2 = parseInt(req.body.active_value) + parseInt(5)
  console.log("AV2", av2)
  let trl = parseInt(av2) + parseInt(5)
  console.log("TRL", trl)
  let FT1 = parseInt(trl) + parseInt(10)
  console.log("FT1", FT1)


  let FT2 = parseInt(FT1) + parseInt(10)
  console.log("FT2", FT2)

  let FT3 = parseInt(FT2) + parseInt(10)
  console.log("FT3", FT3)
  let FT5 = parseInt(FT3) + parseInt(10)
  console.log("FT5", FT5)
  let FT6 = parseInt(FT5) + parseInt(10)
  console.log("FT6", FT6)

  let pl = (req.body.qty * 50) * (FT6 - req.body.active_value)
  console.log("PL", pl)

  let pl_per = (pl / investment_amt * 100).toFixed(2);
  console.log("PL%%%%", pl_per)

let SL = findone.SL;
let sl_type = findone.sl_type;
//   let status = findone.status
 
  let update = await Alltrade.findOneAndUpdate(
    { _id: req.params.id },

    { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5,FT6, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
    { new: true }
  )
 let status = update.status
 let tradeStatusS = update.tradeStatus
 let tradeId= update._id
  console.log("TRADEID",tradeId)
  // console.log("TRADESTS", tradeStatusS)
  // console.log("STATUS", status)
  // console.log("UPDATE", update)
  const FT6tym = new Date().toString()
  console.log("isodate",FT6tym)

  const newTradeHistory = new TradeHistory({
    qty: qty,
    active_value: active_value,
    SL:SL,
    sl_type:sl_type,
    FT1: FT1,
    FT1_type: FT1_type,
    FT2: FT2,
    FT2_type: FT2_type,
    FT3: FT3,
    FT3_type: FT3_type,
    FT5: FT5,
    FT6:FT6,
    FT6time:FT6tym,
    FT6_type:FT6_type,
    status: status,
    pl: pl,
    pl_per: pl_per,
    investment_amt: investment_amt,
    cstmMsg: cstmMsg,
    tradeStatus: tradeStatusS,
    trl:trl,
    tradeId:tradeId
  })
  newTradeHistory
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
        investment_amt: investment_amt,
        SL: SL,
        PL: pl,
        PLPER: pl_per,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        tradeStatus: tradeStatus,
        tradeId:tradeId
      })
      // console.log("DATA", data)
      // console.log("UPDATE", update)

    })

} 

else if ( FT7_type == "false" &&FT7 == FT7){
  console.log("FT7777")
  investment_amt = (req.body.qty * 50) * (req.body.active_value)
  console.log("InvestAMT", investment_amt)
  let av2 = parseInt(req.body.active_value) + parseInt(5)
  console.log("AV2", av2)
  let trl = parseInt(av2) + parseInt(5)
  console.log("TRL", trl)
  let FT1 = parseInt(trl) + parseInt(10)
  console.log("FT1", FT1)


  let FT2 = parseInt(FT1) + parseInt(10)
  console.log("FT2", FT2)

  let FT3 = parseInt(FT2) + parseInt(10)
  console.log("FT3", FT3)
  let FT5 = parseInt(FT3) + parseInt(10)
  console.log("FT5", FT5)
  let FT6 = parseInt(FT5) + parseInt(10)
  console.log("FT6", FT6)
  let FT7 = parseInt(FT6) + parseInt(10)
  console.log("FT6", FT7)

  let pl = (req.body.qty * 50) * (FT6 - req.body.active_value)
  console.log("PL", pl)

  let pl_per = (pl / investment_amt * 100).toFixed(2);
  console.log("PL%%%%", pl_per)

let SL = findone.SL;
let sl_type = findone.sl_type;
//   let status = findone.status
 
  let update = await Alltrade.findOneAndUpdate(
    { _id: req.params.id },

    { $set: { sl_type: "false", FT1_type: "true", FT1, FT2_type, FT2, FT3_type,FT3,FT5,FT6,FT7, pl, pl_per, investment_amt, SL, status: "Active", cstmMsg, tradeStatus, trade_type,trl } },
    { new: true }
  )
 let status = update.status
 let tradeStatusS = update.tradeStatus
 let tradeId= update._id
 console.log("TRADEID",tradeId)
  // console.log("TRADESTS", tradeStatusS)
  // console.log("STATUS", status)
  // console.log("UPDATE", update)
  const FT7tym = new Date().toString()
  console.log("isodate",FT7tym)
  const newTradeHistory = new TradeHistory({
    qty: qty,
    active_value: active_value,
    SL:SL,
    sl_type:sl_type,
    FT1: FT1,
    FT1_type: FT1_type,
    FT2: FT2,
    FT2_type: FT2_type,
    FT3: FT3,
    FT3_type: FT3_type,
    FT5: FT5,
    FT6:FT6,
    FT7:FT7,
    FT7time:FT7tym,
    status: status,
    pl: pl,
    pl_per: pl_per,
    investment_amt: investment_amt,
    cstmMsg: cstmMsg,
    tradeStatus: tradeStatusS,
    trl:trl,
    tradeId:tradeId
  })
  newTradeHistory
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
        investment_amt: investment_amt,
        SL: SL,
        PL: pl,
        PLPER: pl_per,
        FT1: FT1,
        FT1_type: FT1_type,
        FT2: FT2,
        FT2_type: FT2_type,
        FT3: FT3,
        FT3_type: FT3_type,
        tradeStatus: tradeStatus,
        tradeId:tradeId
      })
      // console.log("DATA", data)
      // console.log("UPDATE", update)

    })

} 
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });

  }
}


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
