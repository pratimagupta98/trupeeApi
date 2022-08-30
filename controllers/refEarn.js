const RefEarn = require("../models/refEarn");



exports.addrefer_earn = async (req, res) => {
    const {
        refer_from_id,
        refer_to_id,
        verify_code,
        membership,
        status,
      
    } = req.body;
  
    const newReferEarn = new ReferEarn({
        refer_from_id: refer_from_id,
        refer_to_id: refer_to_id,
        verify_code:verify_code,
        status: status,
        membership:membership
       
    });
    
    const findexist = await ReferEarn.findOne({refer_to_id: refer_to_id 
      });
      if (findexist) {
        res.status(400).json({
          msg:"already"
        })
       }else{
        const findone = await User.findOne({ _id: req.body.refer_from_id });
        if(findone){
        console.log("STRING",findone)
        let  Code = findone?.referral_code
        console.log("RefereCode",Code)
        
     if(req.body.verify_code ==  Code ){ 

      const getdata = await Userwallet.findOne({userId:req.body.refer_from_id}).sort({
        createdAt: -1,
      }).populate("userId")
      console.log("GET DATA",getdata)
      if(getdata){
       let  userid = getdata.userId
       console.log("USER",userid)
       let user_wallet = userid.walletId
       console.log("USER WALLET",user_wallet)


      
        let amt=getdata.amount
        console.log("old amt Mil Gya",amt)

        if(amt){
          let addamt = 2
          currntamt = amt + parseInt(addamt)
          console.log("CURRENT AMT",currntamt)
         }

         const getdatas = await Userwallet.findOne({userId:req.body.refer_from_id}).sort({
          createdAt: -1,
        }).populate("userId").sort({createdAt:-1})

         const findandUpdateEntry = await Userwallet.findOneAndUpdate(
    
          {userId: req.body.refer_from_id },
          
          {$set: {amount:currntamt}},
          
      
        { new: true }
      ).sort({createdAt:-1})
     console.log("Update Ho Gya",findandUpdateEntry)
     //console.log("paisa",findandUpdateEntry.amount)

     newReferEarn
          .save()
         .then((data) => {
           res.status(200).json({
             status: true,
             msg: "success",
             data: data,
            
           });
         })
        
         .catch((error) => {
           res.status(200).json({
             status: false,
             msg: "error",
             error: error,
           });
         });
     }
      }  else {
        res.status(200).json({
          status: false,
          msg: "Wrong Verify Code",
        });
      }
 
 }
}
       }