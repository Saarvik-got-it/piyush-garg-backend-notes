const express = require("express");

const router = express.Router();


router.get("/", async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

router
  .route("/:id")

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

router.post("/", async (req, res) => {
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

module.exports = Router;
