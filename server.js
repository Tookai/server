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
app.use("/api/user", userRoute);
//? --------------------------------
app.use("/api/post", postRoute);
//? --------------------------------

//
//
//
const models = require("./models");
models.sequelize.sync().then(() => {
  app.listen(5500, () => {
    console.log("===> Backend server is running! <===");
  });
});
