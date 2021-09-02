const express = require("express");
const app = express();
const cors = require("cors");
// ---------------------------------
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const likeRoute = require("./routes/likes");
// ---------------------------------
// ---------------------------------

app.use(express.json());
app.use(cors());
//? --------------------------------
app.use("/api/user", userRoute);
//? --------------------------------
app.use("/api/post", postRoute);
//? --------------------------------
app.use('/api/like', likeRoute)
//? --------------------------------
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
