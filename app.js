const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//require
 
const user = require("./routes/user")
const admin = require("./routes/admin")
const plan = require("./routes/plan")
const faq = require("./routes/faq")
const script = require("./routes/script")
const feedback = require("./routes/feedback")
const notification = require("./routes/notification")
const about_us = require("./routes/about_us")
const terms_condition = require("./routes/terms_condition")
const appriciation = require("./routes/appriciation")
const membership = require("./routes/membership")
const startup = require("./routes/startup")






//use
app.use("/", user);
app.use("/", admin);
app.use("/", plan);
app.use("/", faq);
app.use("/", script);
app.use("/", feedback);
app.use("/", notification);
app.use("/", about_us);
app.use("/", terms_condition);
app.use("/", appriciation);
app.use("/", membership);
app.use("/", startup);




app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 8000, () => {
  console.log("Example app listening on port 8000");
});

//    http://localhost:5000/admin
