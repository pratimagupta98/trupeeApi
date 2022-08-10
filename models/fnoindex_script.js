const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {


        scriptName: { type: String },

        status: {
            type: String,
            default:"Deactive"
        },

    },

    { timestamps: true }
);


module.exports = mongoose.model("fno_script", thisSchema);
