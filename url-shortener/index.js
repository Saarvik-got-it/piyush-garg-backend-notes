const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const { connectMongoDb } = require("./connection");
const { URL } = require("./models/url");
const { redirectUrl } = require("./controllers/url");
const app = express();
const PORT = 8001;

//MongoDB Connection
connectMongoDb("mongodb://127.0.0.1:27017/url-shortener").then(() =>
  console.log("MongoDB Connected"),
);

//Middleware
app.use(express.json());

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req, res) => {
  const getAllUrls = await URL.find({});
  return res.render("home", {
    urls: getAllUrls,
  });
});

app.use("/", urlRoute);

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT} `));
