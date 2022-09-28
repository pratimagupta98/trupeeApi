const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    userid:{
        type: Schema.Types.ObjectId,
        ref: "user",
      },
   
    refral_Code:{
type:String
    },
    refer_from:{
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    planId:{
      type: Schema.Types.ObjectId,
      ref: "plan",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
   
  
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("refer_earn", thisSchema);
