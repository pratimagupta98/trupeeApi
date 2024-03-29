const Membership = require("../models/membership");
const User = require("../models/user");
const Plan = require("../models/plan");
const ReferEarn = require("../models/refer_earn");
const moment = require('moment');
const RefEarn = require("../models/refEarn");

const resp = require("../helpers/apiResponse");
const _ = require("lodash");
const user = require("../models/user");
const { findByIdAndDelete } = require("../models/refEarn");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
exports.addmembership = async (req, res) => {
  const t = new Date()
  const oneyr = new Date()

  let qq = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  const date1 = ("0" + qq.getDate()).slice(-2);
  const month = ("0" + (qq.getMonth() + 1)).slice(-2);
  const year = qq.getFullYear();
  let det = `${year}-${month}-${date1}`
  console.log("ffffff", det)


  const { userid, transaction_id, date, planId, expdate } = req.body;
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
    expdate: det,
    //  status:status
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
// exports.viewonemembership = async (req, res) => {

//   let getdetail= await Membership
//   .findOne({ _id: req.params.id })
//   //.populate("planId").populate("userid")

//   d = Date.now()
//   var today = moment(d).format('DD-MM-YYYY')
//   console.log("today",today)

//      // dtt =getdetail.date,
//       expdtt=  getdetail.expdate  //7

//       console.log("expdtt", expdtt)

//       if(d = expdtt){

//         console.log("success")
// let x = await Membership.findOneAndUpdate(
//   { _id:req.params.id },
//   { $set: { exp_free_mem: "false" } },
//   { new: true }
// )
// .then((data) => resp.successr(res, data))
// .catch((error) => resp.errorr(res, error))

//       }else{
//         console.log("else")

//         res.status(200).json({
//           status:true,
//           message:"success",
//           data:getdetail
//         })
//       }
//     }


exports.viewonemembership = async (req, res) => {
  const getdetail = await Membership.findOne({ _id: req.params.id }).populate("userid").populate("planId")
  let dtt = getCurrentDate()
  let expp = getdetail.expdate
  console.log("dtt", dtt)
  console.log("expp", expp)
  if (dtt == expp) {
    console.log("success")
    let qur = await Membership.findOneAndUpdate(
      { _id: req.params.id },

      { $set: { exp_free_mem: "false" } },

      //{ $set: {status:"success"} },
      { new: true }

    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
    //console.log("QR",qur)

  } else {
    res.status(200).json({
      status: true,
      msg: "success",
      getdetail: getdetail
    })
  }
  // var d1 = new Date (),
  //     d2 = new Date ( d1 );
  // d2.setMinutes ( d1.getMinutes() + 30 ).toLocaleTimeString()
  // console.log( "STRING",d2 );


  // var now = new Date();
  // now.setMinutes(now.getMinutes() + 30).toLocaleTimeString() // timestamp
  // now = new Date(now); // Date object
  // console.log("now",now);


}

exports.updatemembership = async (req, res) => {
  const getdata = await Membership

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

  const getdeatil = req.params.id
  console.log("getdata", getdata.userid)
  const getuser = await User
    .findOneAndUpdate(
      {
        _id: getdata.userid,
        //  console.log(req.params._id);
      },
      {
        $set: req.body,
      },
      { new: true }
    )

    // console.log(getuser)
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

exports.refer_earn = async (req, res) => {
  const { refral_Code, planId } = req.body


  const findexist = await ReferEarn.findOne({ userid: req.userId })
  if (findexist) {
    resp.alreadyr(res);
  } else {

    const getuser = await User.findOne({ userid: req.userId })
    console.log("getuser", getuser)
    if (getuser) {
      console.log("STRNG", getuser)
      const getdesprce = getuser.des_price
      let planId = getuser.planId
      console.log("PLANID", planId)

      console.log("DESPRICE", getdesprce)
      price = getdesprce * 12 / 100
      console.log("TOTAL PRICE", price)
      const getrefercode = await User.findOne({ refral_Code: req.body.refral_Code })
      if (getrefercode.refral_Code) {
        console.log("GETDETAIL", getrefercode)
        wolt = getrefercode.amount
        console.log("wolt", wolt)
        addamt = parseInt(price) + parseInt(wolt)
        console.log("ADD HO GYA", addamt)

        const newReferEarn = new ReferEarn({
          userid: req.userId,
          refral_Code: refral_Code,
          refer_from: getrefercode,
          planId: planId
        });
        await User.findOneAndUpdate(
          {
            _id: getrefercode._id,
          },
          { $set: { amount: addamt } },
          { new: true }
        )
        newReferEarn
          .save()

          .then((data) => resp.successr(res, data))
          .catch((error) => resp.errorr(res, error))

      }
    }
  }


}
exports.referearn_list = async (req, res) => {
  await RefEarn.find().populate("refer_from_id").populate("refer_to_id").populate("membership")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltReferEarn = async (req, res) => {
  await ReferEarn.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


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


exports.freeMembership = async (req, res) => {
  const { planId, type, } = req.body
  let dd = new Date();
  var ddd = moment(dd).format('DD-MM-YYYY')
  console.log("ddd", ddd)
  var days7 = dd.setDate(dd.getDate() + 7)
  console.log("seven days after", days7)
  var after7days = moment(days7).format('DD-MM-YYYY')
  console.log("7 Days", after7days)

  const newMembership = new Membership({
    userid: req.userId,
    date: getCurrentDate(),

    planId: planId,
    type: "Free",
    expdate: after7days
  });
  console.log("newMembership", newMembership)

  const findexist = await Membership.findOne({ $and: [{ type: "Free" }, { userid: req.userId }] })

  if (findexist) {
    resp.alreadyr(res);
  } else {
    newMembership
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));

    let planid = await Plan.findOne({ _id: "64b7c7b95f27c6afc5f3fbc1" })
    console.log("PLAN", planid)
    let pack_name = planid.pack_name
    console.log("Plan price", pack_name)

    let qur = await User.findOneAndUpdate(
      { _id: req.userId },

      { $set: { planId: planid, pack_name: pack_name, start_date: ddd, expdate: after7days, type: "Free", pack_name: pack_name, exp_free_mem: "true" } },

      //{ $set: {status:"success"} },
      { new: true }

    ).populate("planId")
    console.log("QURRRR", qur)
  }

}


exports.ttlfreeusers = async (req, res) => {
  await Membership.countDocuments({ type: "Free" })

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



exports.membershipPayment = async (req, res) => {
  // await membershipplan.remove();
  const getdata = await Membership
    .find({ $and: [{ "razorpay_payment_id": { $ne: '' } }, { "razorpay_payment_id": { $ne: undefined } }] }).populate("userid").populate("planId")
    // console.log("STRING",getdata)
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error))

  // { $ne: null }
  // "razorpay_payment_id" : { $ne: undefined  },
  // $and:[{seller: req.sellerId},{name: name}]}

  //   var newarr = getdata.map(function (value) {
  //     return value.razorpay_payment_id,value


  //   });
  //   console.log("data",newarr);

  //   let store = newarr

  //   datas = store.filter(function( element ) {
  //     return element !== undefined;
  //  });
  //  console.log("data",datas)

  //  // console.log("STORE",store)

  //  if(datas){
  //   res.status(200).json({
  //     status: true,
  //         msg: "success",
  //         data : datas

  //   })
  //  }else {
  //   res.status(400).json({
  //     status: true,
  //         msg: "success",
  //         data : datas
  //   })
  //  }




}


exports.UsermembershipPayment = async (req, res) => {
  // await membershipplan.remove();
  const getdata = await Membership
    .find({ $and: [{ userid: req.userId }, { "razorpay_payment_id": { $ne: '' } }, { "razorpay_payment_id": { $ne: undefined } }] }).populate("userid").populate("planId")
    // console.log("STRING",getdata)
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error))

}


exports.memberByType = async (req, res) => {
  const findall = await Membership.find({ type: req.params.id }).sort({
    sortorder: 1,
  });
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