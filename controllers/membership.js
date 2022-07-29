const Membership = require("../models/membership");
 const resp = require("../helpers/apiresponse");
const _ = require("lodash");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
};
console.log("date de do yrr",getCurrentDate)
exports.addmembership = async (req, res) => {
  const { userid, transaction_id, status, date, planId } = req.body;
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
    .populate("planId")
    .populate("dealer_id")

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allmembershipplanApp = async (req, res) => {
  await Membership
    .find({ dealer_id: req.params.dealer_id })
    .populate("planId")
    .populate("dealer_id")

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.viewonemembership = async (req, res) => {
  await Membership
    .findOne({ _id: req.params.id })
    .populate("planId")
    .populate("dealer_id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.deletemembership = async (req, res) => {
  await Membership
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.updatemembership = async (req, res) => {
  // const { dealer_id } = req.body;
  let obj = await Membership
    .findOne({ _id: req.params.id })
    .sort({ createdAt: -1 });

  let dealerid = obj.dealer_id;

 // console.log("old", dealerid);
  let dealer = await Dealershipform.findOneAndUpdate(
    {
      _id: dealerid,
      //console.log(dealerid);
    },
    {
      $set: { planId: obj._id },
    },
    { new: true }
  ).populate("planId");

  console.log("updated", dealer);
  await membershipplan

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
    .populate("dealer_id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.total7sayplan = async (req, res) => {
  await membershipplan
    .countDocuments({
      $and: [{ planId: "6214a6adc26c6f9aa48030b3" }, { status: "Confirm" }],
    })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.totalvasicplan = async (req, res) => {
  await membershipplan
    .countDocuments({
      $and: [{ planId: "6214a6bcc26c6f9aa48030b6" }, { status: "Confirm" }],
    })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.totalendtoendplan = async (req, res) => {
  await membershipplan
    .countDocuments({
      $and: [{ planId: "6214a6c6c26c6f9aa48030bb" }, { status: "Confirm" }],
    })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.total7dayplanearnig = async (req, res) => {
  let amt = await membershipplan.find({
    $and: [{ planId: "6214a6adc26c6f9aa48030b3" }, { status: "Confirm" }],
  });
  console.log(amt);
  let amount = [];
  for (const iterator of amt) {
    amount.push(iterator.amount);
  }
  console.log(amount);
  let total = _.sum([...amount]);
  console.log(total);
  res.json({
    status: true,
    Earning: total,
  });
};
exports.totalbasicplanearning = async (req, res) => {
  let amt = await membershipplan.find({
    $and: [{ planId: "6214a6bcc26c6f9aa48030b6" }, { status: "Confirm" }],
  });
  console.log(amt);
  let amount = [];
  for (const iterator of amt) {
    amount.push(iterator.amount);
  }
  console.log(amount);
  let total = _.sum([...amount]);
  console.log(total);
  res.json({
    status: true,
    Earning: total,
  });
};
exports.endtoendearning = async (req, res) => {
  let amt = await membershipplan.find({
    $and: [{ planId: "6214a6c6c26c6f9aa48030bb" }, { status: "Confirm" }],
  });
  console.log(amt);
  let amount = [];
  for (const iterator of amt) {
    amount.push(iterator.amount);
  }
  console.log(amount);
  let total = _.sum([...amount]);
  console.log(total);
  res.json({
    status: true,
    Earning: total,
  });
};
