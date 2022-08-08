const FnoIndex = require("../models/fno_index");
const resp = require("../helpers/apiResponse");

exports.add_fnoIndex= async (req, res) => {
    
    const {date,time,equity_script,script_name,active_value,call_type,qty,investment_amt,no_of_lots,status,pl_type,profit_loss,trade_type } = req.body;

  
   
  const getvalue = await FnoIndex.findOne({active_value :req.body.active_value})
  if(getvalue)

  console.log("STRING",getvalue)
  let active_value2 = getvalue.active_value
     let  av2 = parseInt(active_value2) + parseInt(10)
       console.log(av2)
           let SL = parseInt(active_value2) -20
      let trl = parseInt(av2) + parseInt(10)
  console.log(trl)
      let  T1 =parseInt (trl) + parseInt(20)
       console.log(T1)
       let T2 = parseInt (T1) + parseInt(20)
       console.log(T2)
       let T3 = parseInt (T2) + parseInt(20)
       
       const newFnoIndex = new FnoIndex({
        date:date,
          time:time,
          equity_script: equity_script,
          script_name:script_name,
           
          active_value:active_value,
          active_value2:active_value2,
          call_type:call_type,
           qty:qty,
          investment_amt:investment_amt,
          no_of_lots:no_of_lots,
          status:status,
          pl_type:pl_type,
          profit_loss:profit_loss,
          trade_type:trade_type,
          T1:T1,
          T2:T2,
          T3:T3,
          SL:SL,
          trl:trl,
          active_value2:av2
    
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
          sl:SL    
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