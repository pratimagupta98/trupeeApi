const RefEarn = require("../models/refEarn");
const User = require("../models/user");
const Plan = require("../models/plan");



// exports.addRefEarn = async (req, res) => {
//   const {
//     refer_from_id,
//     refer_to_id,
//     verify_code,
//     membership,
//     status,

//   } = req.body;
//   let today = new Date();
//  // console.log("DATE",today);
//   //console.log(today.getDay());

//   let onedayago = today.setDate(today.getDate() - 1);
//   console.log(new Date(onedayago));
//   console.log(new Date(onedayago).getDay());

//   const newRefEarn = new RefEarn({
//     refer_from_id: refer_from_id,
//     refer_to_id: refer_to_id,
//     verify_code: verify_code,
//     status: status,
//     membership: membership

//   });

//   const findexist = await RefEarn.findOne({
//     refer_to_id: refer_to_id
//   });
//   if (findexist) {
//     res.status(400).json({
//       msg: "already"
//     })  
//   } else {
//     const findPlan = await Plan.findOne({ _id: req.body.membership })
//     let findplanAmt =findPlan.mrp_price
//     console.log("findplanAmt",findplanAmt)
//     console.log("findPlan",findPlan )
//     const findone = await User.findOne({ _id: req.body.refer_from_id });
//     if (findone) {
//       console.log("STRING", findone)
//       let Code = findone?.refral_Code
//       console.log("RefereCode", Code)

//       if (req.body.verify_code == Code) {

//         const getdata = await User.findOne({ userId: req.body.refer_from_id }).sort({
//           createdAt: -1,
//         })
//         console.log("GET DATA", getdata)
//         if (getdata) {
//           let userid = getdata.walletId
//           console.log("USER(Wallet)", userid)

//           let amt = getdata.amount
//           console.log("old amt Mil Gya", amt)
//           let addamt = 2
//           let currntamt = amt + parseInt(addamt)
//           console.log("CURRENT AMT", currntamt)
//           //   if(amt){
//           //     let addamt = 2
//           //  let   currntamt = amt + parseInt(addamt)
//           //     console.log("CURRENT AMT",currntamt)
//           //    }

//           //  const getdatas = await User.findOne({userId:req.body.refer_from_id}).sort({
//           //   createdAt: -1,
//           // }).sort({createdAt:-1})

//           const findandUpdateEntry = await User.findOneAndUpdate(

//             { walletId: req.body.refer_from_id },

//             { $set: { amount: currntamt } },


//             { new: true }
//           ).sort({ createdAt: -1 })
//           console.log("Update Ho Gya", findandUpdateEntry)
//           //console.log("paisa",findandUpdateEntry.amount)

//           newRefEarn
//             .save()
//             .then((data) => {
//               res.status(200).json({
//                 status: true,
//                 msg: "success",
//                 data: data,

//               });
//             })

//             .catch((error) => {
//               res.status(200).json({
//                 status: false,
//                 msg: "error",
//                 error: error,
//               });
//             });
//         }
//       } else {
//         res.status(200).json({
//           status: false,
//           msg: "Wrong Verify Code",
//         });
//       }

//     }
//   }
// }



exports.addRefEarn = async (req, res) => {
  const {
    refer_from_id,
    refer_to_id,
    verify_code,
    membership,
    status,
  } = req.body;
  let today = new Date();
  // ... (existing code)
  let onedayago = today.setDate(today.getDate() - 1);
  console.log(new Date(onedayago));
  console.log(new Date(onedayago).getDay());

  const newRefEarn = new RefEarn({
    refer_from_id: refer_from_id,
    refer_to_id: refer_to_id,
    verify_code: verify_code,
    status: status,
    membership: membership

  });
  const findexist = await RefEarn.findOne({
    refer_to_id: refer_to_id
  });
  if (findexist) {
    res.status(400).json({
      msg: "already"
    })  
  } else {
    const findPlan = await Plan.findOne({ _id: req.body.membership })
    let findplanAmt =findPlan.mrp_price
    console.log("findplanAmt",findplanAmt)
    console.log("findPlan",findPlan )
    const findone = await User.findOne({ _id: req.body.refer_from_id });
  if (findone) {
    // ... (existing code)
    console.log("STRING", findone)
    let Code = findone?.refral_Code
    console.log("RefereCode", Code)

    if (req.body.verify_code == Code) {
      const getdata = await User.findOne({ _id: req.body.refer_from_id })
console.log("getdata",getdata)
      if (getdata) {
        const findPlan = await Plan.findOne({ _id: req.body.membership });
        let findplanAmt = findPlan.mrp_price;

        let referralBonus = (0.05 * findplanAmt); // 5% of the membership plan MRP
        let referralToBonus = (0.10 * findplanAmt); // 10% of the membership plan MRP

        let userWallet = getdata.amount;
        let updatedUserWallet = userWallet + referralBonus;

        const findAndUpdateEntry = await User.findOneAndUpdate(
          { _id:req.body.refer_from_id },
          { $set: { amount: updatedUserWallet } },
          { new: true }
        ) 
console.log("findAndUpdateEntry",findAndUpdateEntry)
        // Update refer_to_id wallet
        const referToData = await User.findOne({ _id: req.body.refer_to_id });
        console.log("referToData",referToData)
        if (referToData) {
          let referToWallet = referToData.amount;
          let updatedReferToWallet = referToWallet + referralToBonus;
console.log("updatedReferToWallet",updatedReferToWallet)
     await User.findOneAndUpdate(
            { _id: req.body.refer_to_id },
            { $set: { amount: updatedReferToWallet }},
            { new: true }
           
          );
        }
      

        // Save referral entry
        newRefEarn
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
    } else {
      res.status(200).json({
        status: false,
        msg: "Wrong Verify Code",
      });
    }
  }
};


}

exports.addRefEarnnn = async (req, res) => {
  const {
    refer_from_id,
    refer_to_id,
    verify_code,
    membership,
    status,

  } = req.body;

  const newRefEarn = new RefEarn({
    refer_from_id: refer_from_id,
    refer_to_id: refer_to_id,
    verify_code: verify_code,
    status: status,
    membership: membership

  });

  const findexist = await RefEarn.findOne({
    refer_to_id: refer_to_id
  });
  if (findexist) {
    res.status(400).json({
      msg: "already"
    })
  } else {
    const findone = await User.findOne({ _id: req.body.refer_from_id });
    if (findone) {
      memstatus = findone.status
      console.log("MEMSTATUS", memstatus)
      console.log("STRING", findone)
      let Code = findone?.refral_Code
      console.log("RefereCode", Code)

      if (req.body.verify_code == Code) {

        const getdata = await User.findOne({ userId: req.body.refer_from_id }).sort({
          createdAt: -1,
        })
        console.log("GET DATA", getdata)
        if (getdata) {
          let userid = getdata.walletId
          console.log("USER(Wallet)", userid)

          //  let user_wallet = userid.walletId
          //  console.log("USER WALLET",user_wallet)



          let amt = getdata.amount
          console.log("old amt Mil Gya", amt)
          let addamt = 2
          let currntamt = amt + parseInt(addamt)
          console.log("CURRENT AMT", currntamt)
          //   if(amt){
          //     let addamt = 2
          //  let   currntamt = amt + parseInt(addamt)
          //     console.log("CURRENT AMT",currntamt)
          //    }

          //  const getdatas = await User.findOne({userId:req.body.refer_from_id}).sort({
          //   createdAt: -1,
          // }).sort({createdAt:-1})

          const findandUpdateEntry = await User.findOneAndUpdate(

            { walletId: req.body.refer_from_id },

            { $set: { amount: currntamt } },


            { new: true }
          ).sort({ createdAt: -1 })
          console.log("Update Ho Gya", findandUpdateEntry)
          //console.log("paisa",findandUpdateEntry.amount)

          newRefEarn
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
      } else {
        res.status(200).json({
          status: false,
          msg: "Wrong Verify Code",
        });
      }

    }
  }
}





