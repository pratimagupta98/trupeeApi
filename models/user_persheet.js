const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
        plan: [{ type: Schema.Types.ObjectId, ref: "plan" }],
    
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
      },
      email: {
        type: String,
      }
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("UserperSheet", thisSchema);
