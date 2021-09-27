const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
// ---------------------------------
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const likeRoute = require("./routes/likes");
const commentRoute = require("./routes/comments");
// ---------------------------------
const auth = require("./middlewares/auth");
// ---------------------------------

app.use(express.json());
app.use(cors());
app.use(helmet());
dotenv.config();
//? --------------------------------
app.use("/api/user", userRoute);
//? --------------------------------
app.use("/api/post", auth, postRoute);
//? --------------------------------
app.use("/api/like", likeRoute);
//? --------------------------------
app.use("/api/comment", commentRoute);
//? --------------------------------

//
//
//
const models = require("./models");
models.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5500, () => {
    console.log("===> Backend server is running! <===");
  });
});
