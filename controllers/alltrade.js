const Alltrade = require("../models/alltrade");
const resp = require("../helpers/apiResponse");




exports.add_fnoIndex= async (req, res) => {
    
  const {script_type,fnoindex_scrpt_name,active_value,call_type,t5,qty,investment_amt,no_of_lots,status,pl_type,profit_loss_amt,trade_type,expiryDate,type } = req.body;


 
// const getvalue = await FnoIndex.findOne({active_value :req.body.active_value})
// if(getvalue)

// console.log("STRING",getvalue)
// let active_value2 = active_value
   let  av2 = parseInt(req.body.active_value) + parseInt(10)
     console.log(av2)
         let SL = parseInt(req.body.active_value) -20
    let trl = parseInt(av2) + parseInt(10)
console.log(trl)
    let  T1 =parseInt (trl) + parseInt(20)
     console.log(T1)
     let T2 = parseInt (T1) + parseInt(20)
     console.log("T2222",T2)
     let T3 = parseInt (T2) + parseInt(20)


  //  const valuetype = await FnoIndex.findOne({pl_type:req.body.pl_type})
 //   console.log("dffrgtf",valuetype)
    if(req.body.pl_type == 'Loss'){
     
      loss = parseInt(req.body.investment_amt) - parseInt(req.body.profit_loss_amt)
     console.log("LOSS", loss)
     
      losspr = (loss*100)/req.body.investment_amt
     console.log("LOSS PERCENTAGE",losspr +'%')
    }else if( req.body.pl_type == "Profit"){
     profit = parseInt(req.body.profit_loss_amt) - parseInt(req.body.investment_amt)
     console.log("PROFIT", profit)

   profitprr = (profit *100)/req.body.investment_amt
  console.log("PROFIT PERCENTAGE",profitprr + '%')
    }
     const newAlltrade = new Alltrade({
       
      script_type: script_type,
      fnoindex_scrpt_name:fnoindex_scrpt_name,
         
        active_value:active_value,
        active_value2:av2,
        call_type:call_type,
         qty:qty,
        investment_amt:investment_amt,
        no_of_lots:no_of_lots,
        status:status,
        pl_type:pl_type,
        profit_loss_amt:profit_loss_amt,
        trade_type:trade_type,
        T1:T1,
        T2:T2,
        T3:T3,
        t5:t5,
        SL:SL,
        trl:trl,
        active_value2:av2,
        expiryDate:expiryDate,
        type:type
        // loss:loss,
        // losspr:losspr,
        //profit:profit,
        //profitprr:profitprr

  
    }); 

    newAlltrade
    .save()
    .then((data)=>{
      res.status(200).json({
        status: true,
        msg: "success",
        data:data,
        active_value2 :av2,
        trl :trl,
        t1:T1   ,
        t2:T2,
        t3:T3,
        sl:SL    ,
        loss:loss,
        losspr:losspr,
       // profit:profit,
       // profitprr:profitprr
      })
     })
    .catch((error) => resp.errorr(res, error));

}
 

exports.add_fnoEquity   = async (req, res) => {
    
  const {script_type,fnoequty_scrpt_name,active_value,active_value2,call_type,SL,sl_type,T1,t1_type,T2,t2_type,T3,t3_type,T4,t4_typet,t5,t5_type,qty,investment_amt,no_of_lots,pl_type,profit_loss_amt,expiryDate,type } = req.body;



const newAlltrade = new Alltrade({
 
  script_type: script_type,
  fnoequty_scrpt_name:fnoequty_scrpt_name,
  active_value:active_value,
  active_value2:active_value2,
  call_type:call_type,
  SL:SL,
  sl_type:sl_type,
  T1:T1,
  t1_type:t1_type,
  T2:T2,
  t2_type :t2_type,
  T3:T3,
  t3_type:t3_type,
  T4:T4,
  t4_typet:t4_typet,
  t5:t5,
  t5_type:t5_type,
  qty:qty,
  investment_amt:investment_amt,
  no_of_lots:no_of_lots,
  pl_type:pl_type,
  profit_loss_amt:profit_loss_amt,
  expiryDate:expiryDate,
  type:type
});

newAlltrade
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}

exports.add_equityCash = async (req, res) => {

  const { script_type, cash_scrpt_name, active_value, active_value2, call_type, SL, sl_type, T1, t1_type, T2, t2_type, T3, t3_type, T4, t4_type,t5,t5_type, qty, investment_amt, no_of_lots, pl_type, profit_loss_amt,expiryDate,type } = req.body;



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
    type:type

  });

  newnewAlltrade
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}

 

exports.tradelist = async (req, res) => {
  await Alltrade.find().populate("fnoindex_scrpt_name").populate("fnoequty_scrpt_name").populate("cash_scrpt_name")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.fno_index_list = async (req, res) => {
  await Alltrade.find({type : "Index"}).populate("fnoindex_scrpt_name")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.fno_equity_list = async (req, res) => {
  await Alltrade.find({type : "Equity"}).populate("fnoequty_scrpt_name")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.equity_Cash_list = async (req, res) => {
  await Alltrade.find({type : "Cash"}).populate("cash_scrpt_name")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};