const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
      userimg: {
        type: Array,
      },
      fullname: {
        type: String,
      },
      email: {
        type: String,
      },
       mobile:{
        type:Number
       },
      password: {
        type: String,
      },
      cnfmPassword: {
        type: String,
      },
      
     
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("user", UserSchema);
