const TradeAlert = require("../models/tradeAlert");
const resp = require("../helpers/apiResponse");

exports.send_tradeAlert = async (req, res) => {
    const { trade_alert, type, script_name } = req.body;

    const newTradeAlert = new TradeAlert({
        trade_alert: trade_alert,
        type: type,
        script_name: script_name
    });
    //   const findexist = await TradeAlert.findOne({ script_name: script_name });
    //   if (findexist) {
    //     resp.alreadyr(res);
    //   } else {
    newTradeAlert
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
}
//}


exports.tradeAlertList = async (req, res) => {
    await TradeAlert.find()
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.getone_tradeAlert = async (req, res) => {
    await TradeAlert.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.edit_tradeAlert = async (req, res) => {
    await TradeAlert.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.dlt_tradeAlert = async (req, res) => {
    await TradeAlert.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};
