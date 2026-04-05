const express = require("express");
const urlRoute = require("./routes/url");
const { connectMongoDb } = require("./connection");
const { URL } = require("./models/url");
const app = express();
const PORT = 8001;

//MongoDB Connection
connectMongoDb("mongodb://127.0.0.1:27017/url-shortener").then(() =>
  console.log("MongoDB Connected"),
);

//Middleware
app.use(express.json());

app.use("/", urlRoute);

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT} `));
