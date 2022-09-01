const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
      // userimg: {
      //   type: Array,
      // },
      firstname: {
        type: String,
      },
      lastname:{
        type: String,
      },
      dob:{
        type: String,
      },
      gender:{
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
      
      // address:{
      //   type: String,
      // },
      // city:{
      //   type: String, 
      //  },
       otp:{type:String},
       userverified:{type:Boolean,default:false},
       refral_Code :{
        type: String,
       },
      //  status:{
      //   type: String,
      //   default:"Deactive"
      //  }
      },
      
     
    { timestamps: true }
  );


  module.exports = mongoose.model("user", UserSchema);
