const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     title: {
        type: String,
      },
      desc: {
        type: String,
      },

      video_link:{
        type: Array,
      }
     
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("trupee_university", thisSchema);
