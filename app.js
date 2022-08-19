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
const trupe_university = require("./routes/trupe_university")
const discount = require("./routes/discount")
const alltrade = require("./routes/alltrade")
const fno_index = require("./routes/fno_index")
const fno_equity = require("./routes/fno_equity")
const equityCash = require("./routes/equityCash")
const mem_content = require("./routes/mem_content")
const bankNifty = require("./routes/bankNifty")
const nifty = require("./routes/nifty")
const trending_charts = require("./routes/trending_charts")
const fnoindex_script = require("./routes/fnoindex_script")
const fnoequity_script = require("./routes/fnoequity_script")
const cash_script = require("./routes/cash_script")
const opportunity = require("./routes/opportunity")
const prformncesheet = require("./routes/prformncesheet")
const user_persheet = require("./routes/user_persheet")

 
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
app.use("/", trupe_university);
app.use("/", discount);
app.use("/", alltrade);
app.use("/", fno_index);
app.use("/", fno_equity);
app.use("/", equityCash);
app.use("/", mem_content);
app.use("/", bankNifty);
app.use("/", nifty);
app.use("/", trending_charts);
app.use("/", fnoindex_script);
app.use("/", fnoequity_script);

app.use("/", cash_script);
app.use("/", opportunity);
app.use("/", prformncesheet);
app.use("/", user_persheet);


app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

//console.log(process.env.DB);
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
