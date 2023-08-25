const RefEarn = require("../models/refEarn");
const User = require("../models/user");
const Plan = require("../models/plan");
const moment = require('moment');



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
    expiry_date
  } = req.body;
  let today = new Date();
  // ... (existing code)
  let onedayago = today.setDate(today.getDate() - 1);
 // console.log(new Date(onedayago));
  //console.log(new Date(onedayago).getDay());

  //########

  const plan = await Plan.findOne({ _id: req.body.membership })
//  console.log("plan", plan)
  if (plan) {
    const packName = plan.pack_name.toLowerCase();
    let expiryDate = new Date();

    if (packName === "1MONTH") {
      let dd = new Date();
      var crntdate = moment(dd).format('DD-MM-YYYY')
      console.log("ddd", crntdate)

      let date = new Date()
      let day = date.getDate();
      let month = date.getMonth() + 2;
      console.log("month", month)
      let year = date.getFullYear();

      let fullDate = `${day}-${month}-${year}.`;
      console.log("1MONTH", fullDate);


      const newRefEarn = new RefEarn({
        refer_from_id: refer_from_id,
        refer_to_id: refer_to_id,
        verify_code: verify_code,
        status: status,
        membership: membership,
        expiry_date: fullDate

      });
      let planid = await Plan.findOne({ _id: req.body.membership })
      console.log("PLAN", planid)
      let pack_name = planid.pack_name
      const findexist = await RefEarn.findOne({
        refer_to_id: refer_to_id
      });
      if (findexist) {
        res.status(400).json({
          msg: "already"
        })
      } else {
        const findPlan = await Plan.findOne({ _id: req.body.membership })
        let findplanAmt = findPlan.mrp_price
        console.log("findplanAmt", findplanAmt)
        console.log("findPlan", findPlan)
        const findone = await User.findOne({ _id: req.body.refer_from_id });
        if (findone) {
          // ... (existing code)
          console.log("STRING", findone)
          let Code = findone?.refral_Code
          console.log("RefereCode", Code)

          if (req.body.verify_code == Code) {
            const getdata = await User.findOne({ _id: req.body.refer_from_id })
            console.log("getdata", getdata)
            if (getdata) {
              const findPlan = await Plan.findOne({ _id: req.body.membership });
              let findplanAmt = findPlan.mrp_price;

              let referralBonus = (0.05 * findplanAmt); // 5% of the membership plan MRP
              let referralToBonus = (0.10 * findplanAmt); // 10% of the membership plan MRP

              let userWallet = getdata.amount;
              let updatedUserWallet = userWallet + referralBonus;

              const findAndUpdateEntry = await User.findOneAndUpdate(
                { _id: req.body.refer_from_id },
                { $set: { amount: updatedUserWallet } },
                { new: true }
              )
              console.log("findAndUpdateEntry", findAndUpdateEntry)
              // Update refer_to_id wallet
              const referToData = await User.findOne({ _id: req.body.refer_to_id });
              console.log("referToData", referToData)
              if (referToData) {
                let referToWallet = referToData.amount;
                let updatedReferToWallet = referToWallet + referralToBonus;
                console.log("updatedReferToWallet", updatedReferToWallet)
                await User.findOneAndUpdate(
                  { _id: req.body.refer_to_id },
                  { $set: { amount: updatedReferToWallet } },
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
    } else if (packName === "3MONTH") {
      let ddd = new Date();
      var dddd = moment(ddd).format('DD-MM-YYYY')
      console.log("ddd", dddd)


      function dateWithMonthsDelay(months) {
        const date = new Date()
        date.setMonth(date.getMonth() + 3)

        return date

      }
      console.log("AAAA", dateWithMonthsDelay())
      let dd = dateWithMonthsDelay()

      var month3 = moment(dd).format('DD-MM-YYYY')
      console.log("3MONTH", month3)
      console.log("90days")
      const newRefEarn = new RefEarn({
        refer_from_id: refer_from_id,
        refer_to_id: refer_to_id,
        verify_code: verify_code,
        status: status,
        membership: membership,
        expiry_date: month3

      });
      let planid = await Plan.findOne({ _id: req.body.membership })
      console.log("PLAN", planid)
      let pack_name = planid.pack_name
      const findexist = await RefEarn.findOne({
        refer_to_id: refer_to_id
      });
      if (findexist) {
        res.status(400).json({
          msg: "already"
        })
      } else {
        const findPlan = await Plan.findOne({ _id: req.body.membership })
        let findplanAmt = findPlan.mrp_price
        console.log("findplanAmt", findplanAmt)
        console.log("findPlan", findPlan)
        const findone = await User.findOne({ _id: req.body.refer_from_id });
        if (findone) {
          // ... (existing code)
          console.log("STRING", findone)
          let Code = findone?.refral_Code
          console.log("RefereCode", Code)

          if (req.body.verify_code == Code) {
            const getdata = await User.findOne({ _id: req.body.refer_from_id })
            console.log("getdata", getdata)
            if (getdata) {
              const findPlan = await Plan.findOne({ _id: req.body.membership });
              let findplanAmt = findPlan.mrp_price;

              let referralBonus = (0.05 * findplanAmt); // 5% of the membership plan MRP
              let referralToBonus = (0.10 * findplanAmt); // 10% of the membership plan MRP

              let userWallet = getdata.amount;
              let updatedUserWallet = userWallet + referralBonus;

              const findAndUpdateEntry = await User.findOneAndUpdate(
                { _id: req.body.refer_from_id },
                { $set: { amount: updatedUserWallet } },
                { new: true }
              )
              console.log("findAndUpdateEntry", findAndUpdateEntry)
              // Update refer_to_id wallet
              const referToData = await User.findOne({ _id: req.body.refer_to_id });
              console.log("referToData", referToData)
              if (referToData) {
                let referToWallet = referToData.amount;
                let updatedReferToWallet = referToWallet + referralToBonus;
                console.log("updatedReferToWallet", updatedReferToWallet)
                await User.findOneAndUpdate(
                  { _id: req.body.refer_to_id },
                  { $set: { amount: updatedReferToWallet } },
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
    } else if (packName === "6MONTH") {
      let ddd = new Date();
      var dddd = moment(ddd).format('DD-MM-YYYY')
      console.log("ddd", dddd)
  
      function dateWithMonthsDelay(months) {
        const date = new Date()
        date.setMonth(date.getMonth() + 6)
  
        return date
  
      }
     // console.log("AAAA", dateWithMonthsDelay())
      let dd = dateWithMonthsDelay()
  
      var month6 = moment(dd).format('DD-MM-YYYY')
     // console.log("6MONTH", month6)
  

      const newRefEarn = new RefEarn({
        refer_from_id: refer_from_id,
        refer_to_id: refer_to_id,
        verify_code: verify_code,
        status: status,
        membership: membership,
        expiry_date: month6

      });
      let planid = await Plan.findOne({ _id: req.body.membership }) 
    //  console.log("PLAN", planid)
      let pack_name = planid.pack_name
      const findexist = await RefEarn.findOne({
        refer_to_id: refer_to_id
      });
      if (findexist) {
        res.status(400).json({
          msg: "already"
        })
      } else {
        const findPlan = await Plan.findOne({ _id: req.body.membership })
        let findplanAmt = findPlan.mrp_price
      //  console.log("findplanAmt", findplanAmt)
     //   console.log("findPlan", findPlan)
        const findone = await User.findOne({ _id: req.body.refer_from_id });
        if (findone) {
          // ... (existing code)
     //     console.log("STRING", findone)
          let Code = findone?.refral_Code
       //   console.log("RefereCode", Code)

          if (req.body.verify_code == Code) {
            const getdata = await User.findOne({ _id: req.body.refer_from_id })
            console.log("getdata", getdata)
            if (getdata) {
              const findPlan = await Plan.findOne({ _id: req.body.membership });
              let findplanAmt = findPlan.mrp_price;

              let referralBonus = (0.05 * findplanAmt); // 5% of the membership plan MRP
              let referralToBonus = (0.10 * findplanAmt); // 10% of the membership plan MRP

              let userWallet = getdata.amount;
              let updatedUserWallet = userWallet + referralBonus;

              const findAndUpdateEntry = await User.findOneAndUpdate(
                { _id: req.body.refer_from_id },
                { $set: { amount: updatedUserWallet } },
                { new: true }
              )
         //     console.log("findAndUpdateEntry", findAndUpdateEntry)
              // Update refer_to_id wallet
              const referToData = await User.findOne({ _id: req.body.refer_to_id });
            //  console.log("referToData", referToData)
              if (referToData) {
                let referToWallet = referToData.amount;
                let updatedReferToWallet = referToWallet + referralToBonus;
                console.log("updatedReferToWallet", updatedReferToWallet)
                await User.findOneAndUpdate(
                  { _id: req.body.refer_to_id },
                  { $set: { amount: updatedReferToWallet } },
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
    } else if (packName === "1YEAR") {
      let dd = new Date();
      var ddd = moment(dd).format('DD-MM-YYYY')
     // console.log("ddd", ddd)

      let qq = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      const date1 = ("0" + qq.getDate()).slice(-2);
      const month = ("0" + (qq.getMonth() + 1)).slice(-2);
      const year = qq.getFullYear();
      let det = `${date1}-${month}-${year}`
     // console.log("ffffff", det)
      const newRefEarn = new RefEarn({
        refer_from_id: refer_from_id,
        refer_to_id: refer_to_id,
        verify_code: verify_code,
        status: status,
        membership: membership,
        expiry_date: det

      });
      let planid = await Plan.findOne({ _id: req.body.membership })
      console.log("PLAN", planid)
      let pack_name = planid.pack_name
      const findexist = await RefEarn.findOne({
        refer_to_id: refer_to_id
      });
      if (findexist) {
        res.status(400).json({
          msg: "already"
        })
      } else {
        const findPlan = await Plan.findOne({ _id: req.body.membership })
        let findplanAmt = findPlan.mrp_price
     //   console.log("findplanAmt", findplanAmt)
    //    console.log("findPlan", findPlan)
        const findone = await User.findOne({ _id: req.body.refer_from_id });
        if (findone) {
          // ... (existing code)
          console.log("STRING", findone)
          let Code = findone?.refral_Code
      //    console.log("RefereCode", Code)

          if (req.body.verify_code == Code) {
            const getdata = await User.findOne({ _id: req.body.refer_from_id })
          //  console.log("getdata", getdata)
            if (getdata) {
              const findPlan = await Plan.findOne({ _id: req.body.membership });
              let findplanAmt = findPlan.mrp_price;

              let referralBonus = (0.05 * findplanAmt); // 5% of the membership plan MRP
              let referralToBonus = (0.10 * findplanAmt); // 10% of the membership plan MRP

              let userWallet = getdata.amount;
              let updatedUserWallet = userWallet + referralBonus;

              const findAndUpdateEntry = await User.findOneAndUpdate(
                { _id: req.body.refer_from_id },
                { $set: { amount: updatedUserWallet } },
                { new: true }
              )
              console.log("findAndUpdateEntry", findAndUpdateEntry)
              // Update refer_to_id wallet
              const referToData = await User.findOne({ _id: req.body.refer_to_id });
            //  console.log("referToData", referToData)
              if (referToData) {
                let referToWallet = referToData.amount;
                let updatedReferToWallet = referToWallet + referralToBonus;
                console.log("updatedReferToWallet", updatedReferToWallet)
                await User.findOneAndUpdate(
                  { _id: req.body.refer_to_id },
                  { $set: { amount: updatedReferToWallet } },
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
    } else {
      // Default case: No pack_name match, leave the expiry_date unchanged
      expiryDate = new Date(req.body.expiry_date);
    }



    // const newRefEarn = new RefEarn({
    //   refer_from_id: refer_from_id,
    //   refer_to_id: refer_to_id,
    //   verify_code: verify_code,
    //   status: status,
    //   membership: membership,
    //   expiry_date: expiryDate

    // });
    // let planid = await Plan.findOne({ _id: req.body.membership }).populate("membership")
    // console.log("PLAN", planid)
    // let pack_name = planid.pack_name
    // const findexist = await RefEarn.findOne({
    //   refer_to_id: refer_to_id
    // });
    // if (findexist) {
    //   res.status(400).json({
    //     msg: "already"
    //   })
    // } else {
    //   const findPlan = await Plan.findOne({ _id: req.body.membership })
    //   let findplanAmt = findPlan.mrp_price
    //   console.log("findplanAmt", findplanAmt)
    //   console.log("findPlan", findPlan)
    //   const findone = await User.findOne({ _id: req.body.refer_from_id });
    //   if (findone) {
    //     // ... (existing code)
    //     console.log("STRING", findone)
    //     let Code = findone?.refral_Code
    //     console.log("RefereCode", Code)

    //     if (req.body.verify_code == Code) {
    //       const getdata = await User.findOne({ _id: req.body.refer_from_id })
    //       console.log("getdata", getdata)
    //       if (getdata) {
    //         const findPlan = await Plan.findOne({ _id: req.body.membership });
    //         let findplanAmt = findPlan.mrp_price;

    //         let referralBonus = (0.05 * findplanAmt); // 5% of the membership plan MRP
    //         let referralToBonus = (0.10 * findplanAmt); // 10% of the membership plan MRP

    //         let userWallet = getdata.amount;
    //         let updatedUserWallet = userWallet + referralBonus;

    //         const findAndUpdateEntry = await User.findOneAndUpdate(
    //           { _id: req.body.refer_from_id },
    //           { $set: { amount: updatedUserWallet } },
    //           { new: true }
    //         )
    //         console.log("findAndUpdateEntry", findAndUpdateEntry)
    //         // Update refer_to_id wallet
    //         const referToData = await User.findOne({ _id: req.body.refer_to_id });
    //         console.log("referToData", referToData)
    //         if (referToData) {
    //           let referToWallet = referToData.amount;
    //           let updatedReferToWallet = referToWallet + referralToBonus;
    //           console.log("updatedReferToWallet", updatedReferToWallet)
    //           await User.findOneAndUpdate(
    //             { _id: req.body.refer_to_id },
    //             { $set: { amount: updatedReferToWallet } },
    //             { new: true }

    //           );
    //         }
    //         // Save referral entry
    //         newRefEarn
    //           .save()
    //           .then((data) => {
    //             res.status(200).json({
    //               status: true,
    //               msg: "success",
    //               data: data,
    //             });
    //           })
    //           .catch((error) => {
    //             res.status(200).json({
    //               status: false,
    //               msg: "error",
    //               error: error,
    //             });
    //           });
    //       }
    //     } else {
    //       res.status(200).json({
    //         status: false,
    //         msg: "Wrong Verify Code",
    //       });
    //     }
    //   }
    // };
  }
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





exports.addMemeberShip = async (req, res) => {
  const { transaction_id, date, planId, expdate, razorpay_payment_id } = req.body

  // const t = new Date() 
  //     const oneyr =new Date()

  //     let qq=new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  //     const date1 = ("0" + qq.getDate()).slice(-2);
  //     const month = ("0" + (qq.getMonth() + 1)).slice(-2);
  //     const year = qq.getFullYear();
  //   let det= `${date1}-${month}-${year}`


  let dd = new Date();
  var ddd = moment(dd).format('DD-MM-YYYY')
  console.log("ddd", ddd)


  // console.log("ffffff",det)
  const newMembership = new Membership({
    userid: req.userId,
    date: getCurrentDate(),
    transaction_id: transaction_id,
    planId: planId,
    //  expdate:expdate,
    type: "Paid",
    razorpay_payment_id: razorpay_payment_id
  });


  // newMembership
  // .save()
  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error))


  let planid = await Plan.findOne({ _id: req.body.planId })
  console.log("PLAN", planid)

  let pack_name = planid.pack_name
  if (pack_name == "1MONTH") {
    let dd = new Date();
    var crntdate = moment(dd).format('DD-MM-YYYY')
    console.log("ddd", crntdate)

    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 2;
    console.log("month", month)
    let year = date.getFullYear();

    let fullDate = `${day}-${month}-${year}.`;
    console.log("1MONTH", fullDate);

    let qur = await User.findOneAndUpdate(
      { _id: req.userId },

      { $set: { planId: planid, pack_name: pack_name, start_date: crntdate, expdate: fullDate, exp_free_mem: "true" } },

      //{ $set: {status:"success"} },
      { new: true }

    ).populate("planId")
    console.log("QURRRR", qur)

    newMembership
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error))

  } else if (pack_name == "3MONTH") {

    let ddd = new Date();
    var dddd = moment(ddd).format('DD-MM-YYYY')
    console.log("ddd", dddd)


    function dateWithMonthsDelay(months) {
      const date = new Date()
      date.setMonth(date.getMonth() + 3)

      return date

    }
    console.log("AAAA", dateWithMonthsDelay())
    let dd = dateWithMonthsDelay()

    var month3 = moment(dd).format('DD-MM-YYYY')
    console.log("3MONTH", month3)

    let qur = await User.findOneAndUpdate(
      { _id: req.userId },

      { $set: { planId: planid, pack_name: pack_name, start_date: dddd, expdate: month3, exp_free_mem: "true" } },

      //{ $set: {status:"success"} },
      { new: true }

    ).populate("planId")
    console.log("QURRRR", qur)

    newMembership
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error))

    // let date = new Date()
    //     let day = date.getDate();
    //     let month = date.getMonth()+10;
    //     console.log("month",month)
    //     let year = date.getFullYear();

    //     let fullDate = `${day}-${month}-${year}.`;
    //     console.log("3MONTH",fullDate);

  } else if (pack_name == "6MONTH") {
    let ddd = new Date();
    var dddd = moment(ddd).format('DD-MM-YYYY')
    console.log("ddd", dddd)

    function dateWithMonthsDelay(months) {
      const date = new Date()
      date.setMonth(date.getMonth() + 6)

      return date

    }
    console.log("AAAA", dateWithMonthsDelay())
    let dd = dateWithMonthsDelay()

    var month6 = moment(dd).format('DD-MM-YYYY')
    console.log("6MONTH", month6)

    let qur = await User.findOneAndUpdate(
      { _id: req.userId },

      { $set: { planId: planid, pack_name: pack_name, start_date: dddd, expdate: month6, exp_free_mem: "true" } },

      //{ $set: {status:"success"} },
      { new: true }

    ).populate("planId")
    console.log("QURRRR", qur)

    newMembership
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error))

  } else if (pack_name == "1YEAR") {




    let dd = new Date();
    var ddd = moment(dd).format('DD-MM-YYYY')
    console.log("ddd", ddd)

    let qq = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    const date1 = ("0" + qq.getDate()).slice(-2);
    const month = ("0" + (qq.getMonth() + 1)).slice(-2);
    const year = qq.getFullYear();
    let det = `${date1}-${month}-${year}`
    console.log("ffffff", det)


    let qur = await User.findOneAndUpdate(
      { _id: req.userId },

      { $set: { planId: planid, pack_name: pack_name, start_date: ddd, expdate: det, exp_free_mem: "true" } },

      //{ $set: {status:"success"} },
      { new: true }

    ).populate("planId")
    console.log("QURRRR", qur)

    newMembership
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error))

  }
  //    console.log("Plan price",pack_name)

  //    let qur=  await User.findOneAndUpdate(
  //      { _id: req.userId },

  //      {$set: {planId:planid,pack_name:pack_name,start_date:ddd,expdate:after7days,pack_name:pack_name}} ,

  //    //{ $set: {status:"success"} },
  //    { new: true }

  //  ).populate("planId")
  //  console.log("QURRRR",qur)

}
