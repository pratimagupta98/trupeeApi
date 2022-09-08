const Membership = require("../models/membership");
const User = require("../models/user");
const Plan = require("../models/plan");

const resp = require("../helpers/apiResponse");
const _ = require("lodash");
const user = require("../models/user");
const { findByIdAndDelete } = require("../models/refEarn");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
};
 exports.addmembership = async (req, res) => {
  const t = new Date()
  const oneyr =new Date()

  let qq=new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  const date1 = ("0" + qq.getDate()).slice(-2);
  const month = ("0" + (qq.getMonth() + 1)).slice(-2);
  const year = qq.getFullYear();
let det= `${year}-${month}-${date1}`
console.log("ffffff",det)


  const { userid, transaction_id, status, date, planId ,expdate} = req.body;
  let member = await Membership.findOne({
    $and: [{ userid: userid }, { planId: planId }],
  });
//   if (member) {
//     res.status(400).json({
//       status: false,
//       msg: "Your request is alredy Pandding  ",
//     });
//   } else {
    const newMembership = new Membership({
        userid: userid,
      date: getCurrentDate(),
      transaction_id: transaction_id,
      planId: planId,
     status:status,
     expdate:det,
     status:status
    });

    newMembership
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
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
  }
//}
exports.allmembership = async (req, res) => {
  // await membershipplan.remove();
  await Membership
    .find()
    .populate("userid")
    .populate("planId")

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
// exports.allmembershipplanApp = async (req, res) => {
//   await Membership
//     .find({ dealer_id: req.params.dealer_id })
//     .populate("planId")
//     .populate("dealer_id")

//     .sort({ sortorder: 1 })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };
exports.viewonemembership = async (req, res) => {
  await Membership
    .findOne({ _id: req.params.id })
    .populate("planId")
    .populate("userid")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
  


exports.updatemembership = async (req, res) => {    
    await Membership
  
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
      .populate("planId")
      .populate("userid")
  
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.dlt_membership = async (req, res) => {
    await Membership.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

// exports.total7sayplan = async (req, res) => {
//   await membershipplan
//     .countDocuments({
//       $and: [{ planId: "6214a6adc26c6f9aa48030b3" }, { status: "Confirm" }],
//     })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };
// exports.totalvasicplan = async (req, res) => {
//   await membershipplan
//     .countDocuments({
//       $and: [{ planId: "6214a6bcc26c6f9aa48030b6" }, { status: "Confirm" }],
//     })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };
// exports.totalendtoendplan = async (req, res) => {
//   await membershipplan
//     .countDocuments({
//       $and: [{ planId: "6214a6c6c26c6f9aa48030bb" }, { status: "Confirm" }],
//     })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };
// exports.total7dayplanearnig = async (req, res) => {
//   let amt = await membershipplan.find({
//     $and: [{ planId: "6214a6adc26c6f9aa48030b3" }, { status: "Confirm" }],
//   });
//   console.log(amt);
//   let amount = [];
//   for (const iterator of amt) {
//     amount.push(iterator.amount);
//   }
//   console.log(amount);
//   let total = _.sum([...amount]);
//   console.log(total);
//   res.json({
//     status: true,
//     Earning: total,
//   });
// };
// exports.totalbasicplanearning = async (req, res) => {
//   let amt = await membershipplan.find({
//     $and: [{ planId: "6214a6bcc26c6f9aa48030b6" }, { status: "Confirm" }],
//   });
//   console.log(amt);
//   let amount = [];
//   for (const iterator of amt) {
//     amount.push(iterator.amount);
//   }
//   console.log(amount);
//   let total = _.sum([...amount]);
//   console.log(total);
//   res.json({
//     status: true,
//     Earning: total,
//   });
// };
// exports.endtoendearning = async (req, res) => {
//   let amt = await membershipplan.find({
//     $and: [{ planId: "6214a6c6c26c6f9aa48030bb" }, { status: "Confirm" }],
//   });
//   console.log(amt);
//   let amount = [];
//   for (const iterator of amt) {
//     amount.push(iterator.amount);
//   }
//   console.log(amount);
//   let total = _.sum([...amount]);
//   console.log(total);
//   res.json({
//     status: true,
//     Earning: total,
//   });
// };

exports.verifyCode = async (req, res) => {
  const { refral_Code } = req.body

  const findone = await User.findOne({ refral_Code: req.body.refral_Code })
  //console.log("CODE", findone)
  if (findone) {
    res.status(200).send({
      status: true,
      message: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "Code Doesn't exist",
      error: "error",
    });

  }
}


// exports.addMemeberShip = async (req, res) => {
//   const t = new Date()
//   const oneyr =new Date()

//   let qq=new Date(new Date().setFullYear(new Date().getFullYear() + 1))
//   const date1 = ("0" + qq.getDate()).slice(-2);
//   const month = ("0" + (qq.getMonth() + 1)).slice(-2);
//   const year = qq.getFullYear();
// let det= `${year}-${month}-${date1}`
// console.log("ffffff",det)

//   const { userid, transaction_id, status, date, planId ,expdate,refral_Code} = req.body;
 
//     const newMembership = new Membership({
//         userid: userid,
//       date: getCurrentDate(),
//       transaction_id: transaction_id,
//       planId: planId,
//      status:status,
//      expdate:det,
//      status:status,
//      refral_Code:refral_Code
//     });
//     const findexist = await Membership.findOne({ userid: userid });
//     if (findexist) {
//       resp.alreadyr(res);
//     }
//     else{
//     const findone = await User.findOne({refral_Code:req.body.refral_Code})
//     if(findone.refral_Code){
//       getplan = await Plan.findOne({planId :planId})
//       console.log("PLAN",getplan)
//       jj = getplan.des_price
//       console.log("JJ",jj)
//       price = jj*12/100
//       console.log("TOTAL PRICE",price)
//       const getdetail = await User.findOne({refral_Code:req.body.refral_Code})
// if(getdetail.refral_Code){
//   console.log("GETDETAIL",getdetail)
//   console.log("@@@",getdetail)
//   wolt = getdetail.amount
//   addamt = parseInt(price) +parseInt(wolt)
//   console.log("ADD HO GYA",addamt)
//  await User.findOneAndUpdate(
//   {
//     _id: getdetail._id,
//   },
//   { $set: {amount :addamt } },
//   { new: true }
// )
// newMembership
//       .save()
//   .then((data) => resp.successr(res, data))
//   .catch((error) => resp.errorr(res, error))
  
// } 
// } 
// else if(!findone.refral_Code){
//   const getwallet = await User.findOne({_id : req.body.userid})
//   if(getwallet){
//     console.log("PPPP",getwallet)
//     pp = getwallet.amount
//     console.log("PAISA",pp)
//     getplan = await Plan.findOne({planId :req.body.planId})
//     if(getplan){
//       plnprice =  getplan.des_price
//       console.log("DSTP",plnprice)
//     }
//     totalamtpay = plnprice - pp
//     console.log("Final",totalamtpay)
// newMembership
//       .save()
//       .then((data) => {
//         res.status(200).json({
//           status: true,
//           msg: "success", 
//           data: data,
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({
//           status: false,
//           msg: "error",
//           error: error,
//         });
//       });
//   }

// }
// }
// }
     
     

  




    // exports.addMemeberShip = async (req, res) => {
    //   const { userid, transaction_id, status, date, planId ,expdate,refral_Code} = req.body;


    //   const newMembership = new Membership({
    //     userid: req.userId,
    // //  date: getCurrentDate(),
    //   transaction_id: transaction_id,
    //   planId: planId,
    //  status:status,
    //  //expdate:det,
    //  status:status,
    //  refral_Code:refral_Code
    // });

    // const findexist = await Membership.findOne({
    //   userid: req.userId
    // });
    // if (findexist) {
    //   res.status(400).json({
    //     msg: "already"
    //   })
    // } else {
    //   const findone = await User.findOne({refral_Code:req.body.refral_Code})
    //   rr =findone?.refral_Code
    //   if(rr){
    //   if (rr == req.body.refral_Code) {
    //     getplan = await Plan.findOne({planId :planId})
    //     let Code = findone?.refral_Code
    //     console.log("PLAN",getplan)
    //     jj = getplan.des_price
    //     console.log("JJ",jj)
    //     price = jj*12/100
    //     console.log("TOTAL PRICE",price)
    //     const getdetail = await User.findOne({refral_Code:req.body.refral_Code})

    //      if(getdetail.refral_Code){
    //         console.log("GETDETAIL",getdetail)
    //         console.log("@@@",getdetail)
    //         wolt = getdetail.amount
    //         addamt = parseInt(price) +parseInt(wolt)
    //         console.log("ADD HO GYA",addamt)
    //        await User.findOneAndUpdate(
    //         {
    //           _id: getdetail._id,
    //         },
    //         { $set: {amount :addamt } },
    //         { new: true }
    //       )
    //       newMembership
    //             .save()
    //         .then((data) => resp.successr(res, data))
    //         .catch((error) => resp.errorr(res, error))
            
    //       } else{
             
    //           res.status(400).json({
    //             status: false,
    //             msg: "Incorrect otp",
    //           });
    //         }
            
          

         
    //     } else{
    //       res.status(400).json({
    //         status: false,
    //         msg: "Incorrect otp",
    //       });
    //     } 
    //    }else  {
  
    //       const getdata = await User.findOne({ userId: req.body.refer_from_id }).sort({
    //         createdAt: -1,
    //       })
    //       console.log("GET DATA", getdata)
    //       if (getdata) {
    //         let userid = getdata.walletId
    //         console.log("USER(Wallet)", userid)
  
             
  
  
  
    //         let amt = getdata.amount
    //         console.log("old amt Mil Gya", amt)
    //         let addamt = 2
    //         let currntamt = amt + parseInt(addamt)
    //         console.log("CURRENT AMT", currntamt)
           
  
    //         const findandUpdateEntry = await User.findOneAndUpdate(
  
    //           { walletId: req.body.refer_from_id },
  
    //           { $set: { amount: currntamt } },
  
  
    //           { new: true }
    //         ).sort({ createdAt: -1 })
    //         console.log("Update Ho Gya", findandUpdateEntry)
    //         //console.log("paisa",findandUpdateEntry.amount)
  
    //         newMembership
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
    //       } else{
    //         res.status(400).json({
    //           status: false,
    //           msg: "Incorrect otp",
    //         });
    //       } 
    //     } 
    //     } 
           
          
    //     }
  
      
    
//     exports.addMemeberShip = async (req, res) => {
//       const {  transaction_id, status, date, planId ,expdate,refral_Code,razorpay_payment_id} = req.body;

//       const t = new Date()
//         const oneyr =new Date()
      
//         let qq=new Date(new Date().setFullYear(new Date().getFullYear() + 1))
//         const date1 = ("0" + qq.getDate()).slice(-2);
//         const month = ("0" + (qq.getMonth() + 1)).slice(-2);
//         const year = qq.getFullYear();
//       let det= `${year}-${month}-${date1}`
//       console.log("ffffff",det)
//       const newMembership = new Membership({
//         userid: req.userId,
//       date: getCurrentDate(),
//       transaction_id: transaction_id,
//       planId: planId,
//      status:status,
//      expdate:det,
//      status:status,
//      refral_Code:refral_Code,
//      razorpay_payment_id:razorpay_payment_id
//     });


//     const findexist = await Membership.findOne({
//       userid: req.userId
//     })
//     if(findexist){

//     }else{
// const getuser = await User.findOne({refral_Code :req.body.refral_Code})
// if(getuser)
//     } 
//     // const findexist = await Membership.findOne({
//     //   userid: req.userId
//     // });
//     // if (findexist) {
//     //   res.status(400).json({
//     //     msg: "already"
//     //   })
//     // } else {
//     //   const findone = await User.findOne({refral_Code:req.body.refral_Code})
      
//     //   if (findone?.refral_Code == req.body.refral_Code) {
//     //     getplan = await Plan.findOne({planId :planId})
//     //     let Code = findone?.refral_Code
//     //     console.log("PLAN",getplan)
//     //     jj = getplan.des_price
//     //     console.log("JJ",jj)
//     //     price = jj*12/100
//     //     console.log("TOTAL PRICE",price)
//     //     const getdetail = await User.findOne({refral_Code:req.body.refral_Code})

//     //      if(getdetail.refral_Code){
//     //         console.log("GETDETAIL",getdetail)
//     //         console.log("@@@",getdetail)
//     //         wolt = getdetail.amount
//     //         addamt = parseInt(price) +parseInt(wolt)
//     //         console.log("ADD HO GYA",addamt)
//     //        await User.findOneAndUpdate(
//     //         {
//     //           _id: getdetail._id,
//     //         },
//     //         { $set: {amount :addamt } },
//     //         { new: true }
//     //       )
//     //       newMembership
//     //             .save()
//     //         .then((data) => resp.successr(res, data))
//     //         .catch((error) => resp.errorr(res, error))
            
//     //       } else{
//     //         const getwallet = await User.findOne({_id : req.body.userId})
          
//     //         if(getwallet){
//     //           console.log("PPPP",getwallet)
//     //               pp = getwallet.amount
//     //               console.log("PAISA",pp)
//     //               getplan = await Plan.findOne({_id :req.body.planId})
        
//     //               if(getplan){
//     //                       plnprice =  getplan.des_price
//     //                       console.log("DSTP",plnprice)
//     //                     }
//     //                     totalamtpay = plnprice - pp
//     //                     console.log("Final",totalamtpay)
        
//     //                     newMembership
//     //                           .save()
//     //                           .then((data) => {
//     //                             res.status(200).json({
//     //                               status: true,
//     //                               msg: "success", 
//     //                               data: data,
//     //                             });
//     //                           })
//     //             .catch((error) => {
//     //               res.status(200).json({
//     //                 status: false,
//     //                 msg: "error",
//     //                 error: error,
//     //               });
//     //             });
//     //         } 
//     //       }
//     //   }else {
//     //     res.status(200).json({
//     //       status: false,
//     //       msg: "Wrong Verify Code",
//     //     });
//     //   }
//     // } 
   


//     }


    




exports.addMemeberShip = async (req, res) => {
  const {  transaction_id, status, date, planId ,expdate,refral_Code,razorpay_payment_id} = req.body;

  const t = new Date()
    const oneyr =new Date()
  
    let qq=new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    const date1 = ("0" + qq.getDate()).slice(-2);
    const month = ("0" + (qq.getMonth() + 1)).slice(-2);
    const year = qq.getFullYear();
  let det= `${year}-${month}-${date1}`
  console.log("ffffff",det)
  const newMembership = new Membership({
    userid: req.userId,
  date: getCurrentDate(),
  transaction_id: transaction_id,
  planId: planId,
 status:status,
 expdate:det,
 status:status,
 refral_Code:refral_Code,
 razorpay_payment_id:razorpay_payment_id
});

const findexist = await Membership.findOne({
  userid: req.userId
});
if (findexist) {
  res.status(400).json({
    msg: "already"
  })
} else {
  const findone = await User.findOne({refral_Code:req.body.refral_Code})
  
  if (findone.refral_Code) {
    getplan = await Plan.findOne({planId :planId})
    let Code = findone?.refral_Code
    console.log("PLAN",getplan)
    jj = getplan.des_price
    console.log("JJ",jj)
    price = jj*12/100
    console.log("TOTAL PRICE",price)
    const getdetail = await User.findOne({refral_Code:req.body.refral_Code})

     if(getdetail.refral_Code){
        console.log("GETDETAIL",getdetail)
        console.log("@@@",getdetail)
        wolt = getdetail.amount
        addamt = parseInt(price) +parseInt(wolt)
        console.log("ADD HO GYA",addamt)
       await User.findOneAndUpdate(
        {
          _id: getdetail._id,
        },
        { $set: {amount :addamt } },
        { new: true }
      )
      newMembership
            .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error))
        
      } 

    else if (!findone.refral_Code) {

      const getwallet = await User.findOne({_id : req.body.userId})
      
      if(getwallet){
        console.log("PPPP",getwallet)
            pp = getwallet.amount
            console.log("PAISA",pp)
            getplan = await Plan.findOne({_id :req.body.planId})

            if(getplan){
                    plnprice =  getplan.des_price
                    console.log("DSTP",plnprice)
                  }
                  totalamtpay = plnprice - pp
                  console.log("Final",totalamtpay)

                  newMembership
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
      }else {
        res.status(200).json({
          status: false,
          msg: "Wrong Verify Code",
        });
      }
    } else {
      res.status(200).json({
        status: false,
        msg: "Wrong Verify Code",
      });
    }

  }else {
    res.status(200).json({
      status: false,
      msg: "Wrong Verify Code",
    });
  }
}


}