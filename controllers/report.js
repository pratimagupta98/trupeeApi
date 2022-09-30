
const creditgiven = require("../models/report");

exports.credit_report = async (req, res) => {
    const { dsm_Id, treadId } = req.body;
    let record = [];
    let credit = await Alltrade
      .find({ _id: treadId  })
      .populate("dsm_name")
      .populate("name_of_customer");
    console.log(credit);
    if (credit == null) {
      res.status(400).json({
        status: false,
        msg: "record not found",
      });
    } else {
      for (const iterator of credit) {
        record.push(iterator.date);
        record.push(iterator.name_of_customer.name_of_customer);
        record.push(iterator.credit_limit);
        record.push(iterator.credit_available);
        record.push(iterator.credit_given_today_amount);
        record.push(iterator.dsm_name.dsm_name);
      }
    }
    let data = {
      record: record,
    };
    res.status(200).json({
      status: true,
      data: data,
    });
  };

  exports.addprofit = async (req, res) => {
    const { date, dealer_id, expectedProfit, netProfit } = req.body;
  
    let rsp = await Alltrade.findOne({ dealer_Id: req.body.dealer_id }).sort({
      createdAt: -1,
    });
    let de = rsp.date;
    console.log("date", de);
    ///expensesCm
    let exp = await expensesCm.find({
      $and: [{ dealer_Id: req.body.dealer_id }, { date: de }],
    });
  
    console.log("exp", exp);
    let expadd = 0;
  
    let newarr = exp.map(function (value) {
      return value.addition;
    });
  
    expadd = _.sum([...newarr]);
    console.log("expadd", expadd);
    ///ms stok
    let ms = await MsStock.find({
      $and: [{ dealer_Id: req.body.dealer_id }, { date: de }],
    });
    console.log("ms", ms);
  
    let msadd = 0;
    let netmsopning = 0;
    let netmsclosing = 0;
  
    let newarrms = ms.map(function (value) {
      return value.sold;
    });
    msadd = _.sum([...newarrms]);
    console.log("newarrms", msadd);
    let newarrmsopning = ms.map(function (value) {
      return value.opening_Value;
    });
    netmsopning = _.sum([...newarrmsopning]);
    console.log("netmsopning", netmsopning);
    let newarrmsclosing = ms.map(function (value) {
      return value.actual_closing_value;
    });
    netmsclosing = _.sum([...newarrmsclosing]);
    console.log("netmsclosing", netmsclosing);
    //hsd stock
    let hsd = await HsdStock.find({
      $and: [{ dealer_Id: req.body.dealer_id }, { date: de }],
    });
    console.log("hsd", hsd);
    let hsdadd = 0;
    let nethsdopning = 0;
    let nethsdclosing = 0;
  
    let hsdsold = hsd.map(function (value) {
      return value.sold;
    });
    hsdadd = _.sum([...hsdsold]);
    console.log("hsdadd", hsdadd);
  
    let hsdopen = hsd.map(function (value) {
      return value.opening_Value;
    });
    nethsdopning = _.sum([...hsdopen]);
    console.log("nethsdopning", nethsdopning);
  
    let hsdclose = hsd.map(function (value) {
      return value.actual_closing_value;
    });
    nethsdclosing = _.sum([...hsdclose]);
    console.log("nethsdclosing", nethsdclosing);
    ///net profit
    //cashinbank
    let bank = await cashinbank.find({
      $and: [{ dealer_Id: req.body.dealer_id }, { date: de }],
    });
    console.log(bank);
    let netbankopning = 0;
    let netbankclosing = 0;
  
    let bankopen = bank.map(function (value) {
      return value.opening_Value;
    });
    netbankopning = _.sum([...bankopen]);
    console.log("netbankopning", netbankopning);
  
    let bankclos = bank.map(function (value) {
      return value.actual_closing_value;
    });
    netbankclosing = _.sum([...bankclos]);
    console.log("netbankclosing", netbankclosing);
    ///cards
    let cards = await cashincards.find();
    console.log("cards", cards);
    let netcardsopning = 0;
    let netcardsclosing = 0;
  
    let cardopen = cards.map(function (value) {
      return value.opening_Value;
    });
    netcardsopning = _.sum([...cardopen]);
    console.log("netcardsopning", netcardsopning);
  
    let cardclos = cards.map(function (value) {
      return value.opening_Value;
    });
    netcardsclosing = _.sum([...cardclos]);
    console.log("netcardsclosing", netcardsclosing);
  
    // console.log("addnetcardsclosing", netcardsclosing);
    // console.log("addnetcardsopning", netcardsopning);
    // console.log(nethsdclosing + addnetbankclosing + netcardsopning);
    // console.log("nnnnnnnnnnn", netmsclosing);
    // console.log(msadd + hsdadd - expadd);
    const newprofit = new profit({
      dealer_id: dealer_id,
      date: de,
      netProfit:
        nethsdclosing +
        netbankclosing +
        netcardsclosing -
        (netcardsopning + netbankopning + netmsopning + nethsdopning),
      expectedProfit: msadd + hsdadd - expadd,
    });
  
    newprofit
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };