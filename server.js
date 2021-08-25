const express = require("express");
const app = express();
const cors = require("cors");
// ---------------------------------
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
// ---------------------------------
// ---------------------------------

app.use(express.json());
app.use(cors());
//? --------------------------------
app.use("/user", userRoute);
//? --------------------------------
app.use("/post", postRoute);
//? --------------------------------

//
//
//
const models = require("./models");
models.sequelize.sync().then((req) => {
  app.listen(5500, () => {
    console.log("===> Backend server is running! <===");
  });
});
