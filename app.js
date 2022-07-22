const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser')
require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//require
const user = require("./routes/user");
//const staff = require("./routes/staff");
 

 
 

//use
app.use("/", user);
app.use(express.json)
app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 5000);
    res.render("error");
  });
//console.log(process.env.DATABASE);
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

app.listen(process.env.PORT || 9000, () => {
  console.log("Example app listening on port 9000");
});

//    http://localhost:9000/admin
