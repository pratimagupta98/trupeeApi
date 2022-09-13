const Alltrade = require("../models/alltrade");
const resp = require("../helpers/apiResponse");
const TradeHistory = require("../models/tradeHistory");

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

exports.add_fnoIndex= async (req, res) => {
    
  const {script_type,fnoindex_scrpt_name,active_value,call_type,FT5,qty,no_of_lots,status,trade_type,expiryDate,type,t5,cstmMsg ,updated_at} = req.body;


  investment_amt =  (req.body.qty*25)*(req.body.active_value)
  console.log("InvestAMT",investment_amt)
   let  av2 = parseInt(req.body.active_value) + parseInt(10)
     console.log(av2)
         let SL = parseInt(req.body.active_value) -20
    let trl = parseInt(av2) + parseInt(10)
console.log(trl)
    let  FT1 =parseInt (trl) + parseInt(20)
     console.log("FT1",FT1)
     let FT2 = parseInt (FT1) + parseInt(20)
     console.log("FT2",FT2)
     let FT3 = parseInt (FT2) + parseInt(20)
     console.log("FT3",FT2)
 
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
      fnoindex_scrpt_name:fnoindex_scrpt_name,
         
        active_value:active_value,
        active_value2:av2,
        call_type:call_type,
         qty:qty,
        investment_amt:investment_amt,
        no_of_lots:no_of_lots,
        status:status,
        trade_type:trade_type,
        FT1:FT1,
        FT2:FT2,
        FT3:FT3,
        FT5:FT5,
        t5:t5,
        SL:SL,
        trl:trl,
        active_value2:av2,
        expiryDate:expiryDate,
        type:type,
        cstmMsg:cstmMsg,
        updated_at:getCurrentDate()
       
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
        investment_amt:investment_amt,
        trl :trl,
        FT1:FT1   ,
        FT2:FT2,
        FT3:FT3,
        SL:SL    ,
       
       // loss:loss,
       // losspr:losspr,
       // profit:profit,
       // profitprr:profitprr
      })
     })
    .catch((error) => resp.errorr(res, error));

}
 

exports.add_fnoEquity   = async (req, res) => {
    
  const {script_type,fnoequty_scrpt_name,active_value,active_value2,call_type,SL,sl_type,T1,t1_type,T2,t2_type,T3,t3_type,T4,t4_typet,t5,t5_type,qty,no_of_lots,pl_type,profit_loss_amt,expiryDate,type,status,cstmMsg } = req.body;


  investment_amt =  (req.body.qty *150)*(req.body.active_value)
  console.log("InvestAMT",investment_amt)


  

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
  type:type,
  status:status,
  cstmMsg:cstmMsg

});

newAlltrade
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}

exports.add_equityCash = async (req, res) => {

  const { script_type, cash_scrpt_name, active_value, active_value2, call_type, SL, sl_type, T1, t1_type, T2, t2_type, T3, t3_type, T4, t4_type,t5,t5_type, qty, no_of_lots, pl_type, profit_loss_amt,expiryDate,type,status,cstmMsg } = req.body;


  investment_amt =  (req.body.qty)*(req.body.active_value)
  console.log("InvestAMT",investment_amt)

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
    type:type,
    status:status,
    cstmMsg:cstmMsg

  });

  newnewAlltrade
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}

 
//APP,ADMIN TRDAE LIST
exports.tradelist = async (req, res) => {
  await Alltrade.find({status:"Active"}).populate("fnoindex_scrpt_name").populate("fnoequty_scrpt_name").populate("cash_scrpt_name").populate("expiryDate")
  .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//ADMIN
exports.fnoIndexlist = async (req, res) => {
  await Alltrade.find({type : "Index"}).populate("fnoindex_scrpt_name").populate("expiryDate")
  .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//APP
exports.AppindexList = async (req, res) => {
  await Alltrade.find({ $and: [{ type: "Index" }, { status: "Active" }]}).populate("fnoindex_scrpt_name").populate("expiryDate")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//ADMIN
exports.fnoEquity_list = async (req, res) => {
  await Alltrade.find({type : "Equity"}).populate("fnoequty_scrpt_name").populate("expiryDate")
  .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
//APP
exports.AppOptionList = async (req, res) => {
  await Alltrade.find({ $and: [{ type: "Equity" }, { status: "Active" }]}).populate("fnoequty_scrpt_name").populate("expiryDate")
  .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//ADMIN
exports.equityCash_list = async (req, res) => {
  await Alltrade.find({type : "Cash"}).populate("cash_scrpt_name").populate("expiryDate")
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
  await Alltrade.find({ $and: [{ type: "Cash" }, { status: "Active" }]}).populate("cash_scrpt_name").populate("expiryDate")
  .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.editFnoindex = async (req, res) => {  
   
  const{qty,active_value,sl_type,FT1_type,FT2,FT2_type,FT3,FT3_type,status,t5,cstmMsg,tradeStatus,updated_at}  = req.body
  let getCurrentDate = function () {
    const t = new Date();
    const date = ("0" + t.getDate()).slice(-2);
    const month = ("0" + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${year}-${month}-${date}`;
  };
let dat = getCurrentDate()
console.log("DTT",dat)
  const newTradeHistory = new TradeHistory({
    qty : qty,
    active_value:active_value,
    sl_type:sl_type,
    FT1_type:FT1_type,
    FT2:FT2,
    FT2_type:FT2_type,
    FT3:FT3,
    FT3_type:FT3_type,
    status:status,
    t5:t5,
    cstmMsg:cstmMsg,
    tradeStatus:tradeStatus

  })


       if (sl_type == "true") {
        investment_amt =  (req.body.qty*25)*(req.body.active_value)
        console.log("InvestAMT",investment_amt)


        let SL = parseInt(req.body.active_value) -20
        console.log("SL",SL)
        
        pl = (req.body.qty*25) *(SL -  req.body.active_value)
        console.log("PL",pl)
 
        pl_per = pl/investment_amt*100
        console.log("PL%%%%",pl_per)
     

        let update=  await Alltrade.findOneAndUpdate(
         { _id: req.params.id },
         
         {$set: {sl_type:"true",FT1_type:"false",FT2_type:"false",FT3_type:"false",pl_per,pl,investment_amt,SL,status,t5,cstmMsg,tradeStatus,updated_at :dat}} ,
       
       //{ $set: {status:"success"} },
       { new: true }
     
     )    
     newTradeHistory.save()
     .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
    }  else if(FT1_type == "true" && FT2_type == "true" && FT3_type == "true"){
      console.log("ABCD")
      investment_amt =  (req.body.qty*25)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)
      let  av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2",av2)
         let trl = parseInt(av2) + parseInt(10)
        console.log("TRL",trl)
       let  FT1 =parseInt (trl) + parseInt(20)
       console.log("FT1",FT1)
     let  FT2 = parseInt (FT1) + parseInt(20)
       console.log("FT2",FT2)

      let FT3 = parseInt (FT2) + parseInt(20)
       console.log("FT3",FT3)
       pl =(req.body.qty*25) *(FT3 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = (pl/investment_amt*100 ).toFixed(2);
       console.log("PL%%%%",pl_per)
      
    
    
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {sl_type:"false",FT1,FT1_type,FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,status,t5,cstmMsg,tradeStatus}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
    newTradeHistory.save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error))
    // .then((data) => resp.successr(res, data))
    // .catch((error) => resp.errorr(res, error))
    

}  else if(FT1_type == "true" && FT2_type == "true"){
      console.log("EFGH")
      investment_amt =  (req.body.qty*25)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)
      let  av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2",av2)
         let trl = parseInt(av2) + parseInt(10)
        console.log("TRL",trl)
       let  FT1 =parseInt (trl) + parseInt(20)
       console.log("FT1",FT1)
      let FT2 = parseInt (FT1) + parseInt(20)
       console.log("FT2",FT2)
       pl = (req.body.qty*25) *(FT2 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
        getpl = await Alltrade.findOne({pl:pl})
        if (getpl){
       //console.log("$$$$$$$$",getpl)
         tpl =getpl.pl
         console.log("###",tpl)
         invest_amt = getpl.investment_amt
         console.log("***",invest_amt)
         pl_per = tpl/invest_amt*100
         console.log("%%%%",pl_per)
        }

    
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {sl_type:"false",FT1,FT1_type,FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,status,t5,cstmMsg,tradeStatus}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
    .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
}  
    else if (  FT1_type == "true") {
      console.log("abcd")
      investment_amt =  (req.body.qty*25)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)
      let  av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2",av2)
         let trl = parseInt(av2) + parseInt(10)
        console.log("TRL",trl)
       let  FT1 =parseInt (trl) + parseInt(20)
       console.log("FT1",FT1)
       pl =(req.body.qty*25) *(FT1 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
        getpl = await Alltrade.findOne({pl:pl})
        if (getpl){
       //console.log("$$$$$$$$",getpl)
         tpl =getpl.pl
         console.log("###",tpl)
         invest_amt = getpl.investment_amt
         console.log("Investamt***",invest_amt)
         pl_per = tpl/invest_amt*100
         console.log("%%%%",pl_per)
        }

    
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {FT1_type:"true",sl_type:"false",FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,FT1,status,t5,cstmMsg,tradeStatus}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
    .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
       
    } else if (FT2_type == "true" ){
      console.log("efgh")
      investment_amt =  (req.body.qty*25)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)
      let  av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2",av2)
         let trl = parseInt(av2) + parseInt(10)
        console.log("TRL",trl)
       let  FT1 =parseInt (trl) + parseInt(20)
       console.log("FT1",FT1)
     let  FT2 = parseInt (FT1) + parseInt(20)
       console.log("FT2",FT2)
       pl = (req.body.qty*25) *(FT2 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
        getpl = await Alltrade.findOne({pl:pl})
        if (getpl){
       //console.log("$$$$$$$$",getpl)
         tpl =getpl.pl
         console.log("###",tpl)
         invest_amt = getpl.investment_amt
         console.log("***",invest_amt)
         pl_per = tpl/invest_amt*100
         console.log("%%%%",pl_per)
        }

    
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {sl_type:"false",FT1,FT1_type,FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,status,t5,cstmMsg,tradeStatus}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
    .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
       
    }else if (FT3_type == "true"){
      console.log("jklm")
      investment_amt =  (req.body.qty*25)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)
      let  av2 = parseInt(req.body.active_value) + parseInt(10)
      console.log("AV2",av2)
         let trl = parseInt(av2) + parseInt(10)
        console.log("TRL",trl)
       let  FT1 =parseInt (trl) + parseInt(20)
       console.log("FT1",FT1)
     let  FT2 = parseInt (FT1) + parseInt(20)
       console.log("FT2",FT2)

     let  FT3 = parseInt (FT2) + parseInt(20)
       console.log("FT3",FT3)
       pl =(req.body.qty*25) *(FT3 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = (pl/investment_amt*100 ).toFixed(2);
       console.log("PL%%%%",pl_per)
      
    
    
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {sl_type:"false",FT1,FT1_type,FT2,FT2_type,FT3,FT3_type,pl_per,pl,investment_amt,status,t5,cstmMsg,tradeStatus}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
       
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error))
}  

}

exports.editfnoOption = async (req, res) => {  
  const{qty,active_value,SL,sl_type,T1,t1_type,T2,t2_type,T3,t3_type,T4,t4_type,status,t5,t5_type,cstmMsg}  = req.body



       if (sl_type == "true") {
        investment_amt =  (req.body.qty*150)*(req.body.active_value)
        console.log("InvestAMT",investment_amt)


        
        
        pl = (req.body.qty*150) *(req.body.SL -  req.body.active_value)
        console.log("PL",pl)
 
        pl_per = pl/investment_amt*100
        console.log("PL%%%%",pl_per)
     

        let update=  await Alltrade.findOneAndUpdate(
         { _id: req.params.id },
         
         {$set: {SL,sl_type:"true",T1,t1_type:"false",T2,t2_type:"false",T3,t3_type:"false",T4,t4_type:"false",pl_per,pl,investment_amt,status,t5,t5_type,cstmMsg}} ,
       
       //{ $set: {status:"success"} },
       { new: true }
     
     )
     .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
    } else if (t1_type == "true") {
      investment_amt =  (req.body.qty*150)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)

            
       pl = (req.body.qty*150) *(req.body.T1 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
      
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {T1,t1_type,SL,sl_type:"false",T2,t2_type,T3,t3_type,T4,t4_type,pl_per,pl,investment_amt,  status,t5,t5_type,cstmMsg}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
    .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
       
    } else if (t2_type == "true"){
      
      investment_amt =  (req.body.qty*150)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)

            
       pl = (req.body.qty*150) *(req.body.T2 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
      
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {T1,t1_type,SL,sl_type:"false",T2,t2_type,T3,t3_type,T4,t4_type,pl_per,pl,investment_amt,  status,t5,t5_type,cstmMsg}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
    .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
       
    }else if (t3_type == "true"){
      investment_amt =  (req.body.qty*150)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)

            
       pl = (req.body.qty*150) *(req.body.T3 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
      
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {T1,t1_type,SL,sl_type:"false",T2,t2_type,T3,t3_type,T4,t4_type,pl_per,pl,investment_amt,  status,t5,t5_type,cstmMsg}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
       
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}else if (t4_type == "true"){
  investment_amt =  (req.body.qty*150)*(req.body.active_value)
  console.log("InvestAMT",investment_amt)

        
   pl = (req.body.qty*150) *(req.body.T4 -  req.body.active_value)
   console.log("PL",pl)

   pl_per = pl/investment_amt*100
   console.log("PL%%%%",pl_per)
  
  
   let update=  await Alltrade.findOneAndUpdate(
    { _id: req.params.id },
    
    {$set: {T1,t1_type,SL,sl_type:"false",T2,t2_type,T3,t3_type,T4,t4_type,pl_per,pl,investment_amt,  status,t5,t5_type,cstmMsg}} ,
  
  //{ $set: {status:"success"} },
  { new: true }

)
   
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};


       
}

exports.editCash = async (req, res) => {  
  const{qty,active_value,SL,sl_type,T1,t1_type,T2,t2_type,T3,t3_type,T4,t4_type,status,t5,t5_type,cstmMsg}  = req.body



       if (sl_type == "true") {
        investment_amt =  (req.body.qty*400)*(req.body.active_value)
        console.log("InvestAMT",investment_amt)


        
        
        pl = (req.body.qty*400) *(req.body.SL -  req.body.active_value)
        console.log("PL",pl)
 
        pl_per = pl/investment_amt*100
        console.log("PL%%%%",pl_per)
     

        let update=  await Alltrade.findOneAndUpdate(
         { _id: req.params.id },
         
         {$set: {SL,sl_type:"true",T1,t1_type:"false",T2,t2_type:"false",T3,t3_type:"false",T4,t4_type:"false",pl_per,pl,investment_amt,status,t5,t5_type,cstmMsg}} ,
       
       //{ $set: {status:"success"} },
       { new: true }
     
     )
     .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
    } else if (t1_type == "true") {
      investment_amt =  (req.body.qty*400)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)

            
       pl = (req.body.qty*400) *(req.body.T1 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
      
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {T1,t1_type,SL,sl_type:"false",T2,t2_type,T3,t3_type,T4,t4_type,pl_per,pl,investment_amt,  status,t5,t5_type,cstmMsg}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
    .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
       
    } else if (t2_type == "true"){
      
      investment_amt =  (req.body.qty*400)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)

            
       pl = (req.body.qty*400) *(req.body.T2 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
      
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {T1,t1_type,SL,sl_type:"false",T2,t2_type,T3,t3_type,T4,t4_type,pl_per,pl,investment_amt,  status,t5,t5_type,cstmMsg}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
    .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
       
    }else if (t3_type == "true"){
      investment_amt =  (req.body.qty*400)*(req.body.active_value)
      console.log("InvestAMT",investment_amt)

            
       pl = (req.body.qty*400) *(req.body.T3 -  req.body.active_value)
       console.log("PL",pl)

       pl_per = pl/investment_amt*100
       console.log("PL%%%%",pl_per)
      
      
       let update=  await Alltrade.findOneAndUpdate(
        { _id: req.params.id },
        
        {$set: {T1,t1_type,SL,sl_type:"false",T2,t2_type,T3,t3_type,T4,t4_type,pl_per,pl,investment_amt,status,t5,t5_type,cstmMsg}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    )
       
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}else if (t4_type == "true"){
  investment_amt =  (req.body.qty*400)*(req.body.active_value)
  console.log("InvestAMT",investment_amt)

        
   pl = (req.body.qty*400) *(req.body.T4 -  req.body.active_value)
   console.log("PL",pl)

   pl_per = pl/investment_amt*100
   console.log("PL%%%%",pl_per)
  
  
   let update=  await Alltrade.findOneAndUpdate(
    { _id: req.params.id },
    
    {$set: {T1,t1_type,SL,sl_type:"false",T2,t2_type,T3,t3_type,T4,t4_type,pl_per,pl,investment_amt,  status,t5,t5_type,cstmMsg}} ,
  
  //{ $set: {status:"success"} },
  { new: true }

)
   
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};


       
}

exports.editalltrade = async (req, res) => {    
  await Alltrade

    .findOneAndUpdate(
      {
        _id: req.params.id,
        //  console.log(req.params._id);
      },
      {
        $set: req.body,
      },
      { new: true }
    )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.viewonetrades = async (req, res) => {
  await Alltrade.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};






exports.add_notificationss = async (req, res) => {
  const { title,desc,img,noti_status} = req.body;

  const newTradeHistory = new TradeHistory({
    title: title,
    desc:desc,
    noti_status:noti_status
     
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


exports.notificationList = async (req, res) => {
  await Alltrade.find({$or: [{ status: "Active" }, { noti_status: "Notification" }]}).populate("fnoindex_scrpt_name").populate("fnoequty_scrpt_name").populate("cash_scrpt_name").populate("expiryDate").populate("tradeId")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.addTnotification = async (req, res) => {
  const {tradeId,desc ,noti_status} = req.body;

  const newAlltrade = new Alltrade({
    tradeId: tradeId,
    desc:desc,
    noti_status:noti_status
  })
 
  newAlltrade.save()
  .then((data) => resp.successr(res, data))
  .catch((error) => resp.errorr(res, error));
}




exports.datefilter = async (req, res) => {
  var dateStr = new Date(year,month,day,0,0,0);
var nextDate = new Date(year,month,day,23,59,59);
  await TradeHistory.find({"createdAt" : { $gte : new ISODate(dateStr), $lte:  new ISODate(nextDate) }})
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
  await Alltrade.countDocuments({status: "Active"})
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
  await Alltrade.countDocuments({tradeStatus: "Closed"})
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
  await Alltrade.find({tradeStatus: "Closed"})
  .then((data) => resp.successr(res, data))
  .catch((error) => resp.errorr(res, error));
};

