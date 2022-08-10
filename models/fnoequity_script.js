const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {


        scriptName: { type: String },

        status: {
            type: String,
            default:"Active"
        },

    },

    { timestamps: true }
);


module.exports = mongoose.model("equity_script", thisSchema);
