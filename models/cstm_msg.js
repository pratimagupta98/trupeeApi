const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {

        title:{
            type: String,
          },
          desc:{
            type: String,
          },
          img:{
          type :Array
          },
          noti_status:{
            type: String,
           //Active
          },
        //   tradeId:{
        //      type: Schema.Types.ObjectId, ref: "alltrade" 
        //   },
        //   cstmMsg:{
        //     type: String,
        //   },
        },
    { timestamps: true }
);


module.exports = mongoose.model("cstmmsg", thisSchema);
