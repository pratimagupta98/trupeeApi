const FnoIndex = require("../models/fno_index");
const resp = require("../helpers/apiResponse");

exports.add_fnoIndex= async (req, res) => {
    
    const {script_type,script_name,active_value,call_type,t5,qty,investment_amt,no_of_lots,status,pl_type,profit_loss_amt,trade_type,expiryDate } = req.body;

  
   
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
       
        loss = parseInt(req.body.investment_amt) - parseInt(req.body.profit_loss)
       console.log("LOSS", loss)
       
        losspr = (loss*100)/req.body.investment_amt
       console.log("LOSS PERCENTAGE",losspr +'%')
      }else if(valuetype.pl_type == "Profit"){
       profit = parseInt(req.body.profit_loss) - parseInt(req.body.investment_amt)
       console.log("PROFIT", profit)

     profitprr = (profit *100)/req.body.investment_amt
    console.log("PROFIT PERCENTAGE",profitprr + '%')
      }
       const newFnoIndex = new FnoIndex({
         
        script_type: script_type,
          script_name:script_name,
           
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
          expiryDate:expiryDate
          // loss:loss,
          // losspr:losspr,
          //profit:profit,
          //profitprr:profitprr

    
      }); 
  
      newFnoIndex
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



exports.fnoIndexlist = async (req, res) => {
    await FnoIndex.find().populate("script_name")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_fnoIndex = async (req, res) => {
    await FnoIndex.findOne({ _id: req.params.id }).populate("script_name")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.edit_fnoIndex = async (req, res) => {
    await FnoIndex.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.dlt_fnoIndex = async (req, res) => {
    await FnoIndex.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };