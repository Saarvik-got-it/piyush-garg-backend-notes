//Version Before implementing middlewares into this express server

const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

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

app.get("/users", (req, res) => {
  /* 
    <ul>
        <li> Piyush Garg </li> 
        <li> ..... </li> 
        <li> ..... </li> 
    */

  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

  return res.send(html);
});

//REST API Implementation

// GET /api/users - List all users in JSON format
app.get("/api/users", (req, res) => {
  console.log("I am in get route", req.myUserName);
  return res.json(users);
});

app
  .route("/api/users/:id")

  //GET /api/users/1 - Get user with user ID 1
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })

  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only update what is sent
    if (req.body.first_name) user.first_name = req.body.first_name;
    if (req.body.last_name) user.last_name = req.body.last_name;
    if (req.body.email) user.email = req.body.email;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      return res.json({ status: "success", user });
    });
  })

  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1); //Deletes element

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      return res.json({ status: "success" });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log("Server Started ! "));
