//Version Before implementing middlewares into this express server

const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 8000;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/backend-tutorial")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);

//Creation of model
const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Receives form data from post request and puts into body

//Custom Middleware
app.use((req, res, next) => {
  console.log("Hello from Middleware 1 ");
  req.myUserName = "Piyush Garg";

  fs.appendFile(
    "./log.txt",
    `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      next(); //Passes on request to next middleware
    },
  );
});

app.use((req, res, next) => {
  console.log("Hello from Middleware 2 ", req.myUserName);
  next(); //Passes on request to next middleware
});

//ROUTES

app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `
    <ul>
        ${allDBUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;

  return res.send(html);
});

//REST API Implementation

// GET /api/users - List all users in JSON format
app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

app
  .route("/api/users/:id")

  //GET /api/users/1 - Get user with user ID 1
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json(user);
  })

  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      first_name: "Modified",
    });
    if (!user) res.status(404).json({ Error: "User not found" });
    return res.json(user);
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.email ||
    !body.last_name ||
    !body.gender ||
    !body.job_title
  )
    return res.status(400).json({ msg: "All fields are required!" });

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log("result ", result);

  return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => console.log("Server Started ! "));
