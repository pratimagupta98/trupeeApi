const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    refer_from_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    refer_to_id:{
      type: Schema.Types.ObjectId,
      ref: "user",
    },
   
    verify_code:{
type:String
    },

    status: {
      type: String,
     default: "Pending"
    },
    membership:{
      type: Schema.Types.ObjectId,
      ref: "plan",
    },
    amount:{
      type :Number
    },
    usd:{
      type:Number
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("refEarn", thisSchema);
