const BankNifty = require("../models/bankNifty");
const resp = require("../helpers/apiResponse");

exports.addBankNifty = async (req, res) => {
  const { equityScript,active_value,call_type,qty ,investment_amt,no_of_lots,script_name} = req.body;

 
  const getvalue = await BankNifty.findOne({active_value :active_value})
  if(getvalue)
  console.log("STRING",getvalue)
  let av1 = getvalue.active_value
     let  av2 = parseInt(av1) + parseInt(10)
       console.log(av2)

      let trl = parseInt(av2) + parseInt(10)
  console.log(trl)
      let  t1 =parseInt (trl) + parseInt(20)
       console.log(t1)
       const newBankNifty = new BankNifty({
        equityScript: equityScript,
        active_value:active_value,
        call_type:call_type,
        qty:qty,
        investment_amt:investment_amt,
        no_of_lots:no_of_lots,
        script_name:script_name,
        
    
      }); 
    
    newBankNifty
      .save()
      .then((data)=>{
        res.status(200).json({
          status: true,
          msg: "success",
          data:data,
          av2 :av2,
          trl :trl,
          t1:t1       
        })
       })
     // .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.getBankNifty = async (req, res) => {
    await BankNifty.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.dltBankNifty= async (req, res) => {
    await Feedback.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  