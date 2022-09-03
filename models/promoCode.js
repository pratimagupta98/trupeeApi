const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
     
      code:{
        type: String,
      },
      plan:{
        type:String,
        default:"Free"
      },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("promoCode", thisSchema);
