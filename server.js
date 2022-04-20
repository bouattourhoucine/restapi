const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const connectDB = require("./connectDB/connectDB");
const Users = require("./models/User");
const router = express.Router();
app.use("/api", router);
router.use(express.json());

router.get("/user", async (req, res) => {
  try {
    const user = await Users.find();
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(504).json({ Error: error });
  }
} ) ;

router.post("/user", async (req, res) => {
  try {
    const { name } = req.body;
    const newName = new Users({ name });
    const user = await newName.save();
    res.status(200).send({ message: "User saved successfully", data: user });
  } catch (error) {
    res.send("Server error");
    console.log(error);
  }
} ) ;

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name } = req.body;
  console.log(name);
  try {
    await Users.findByIdAndUpdate({ _id: id }, { $set: { name: name } });
    res.status(200).send({ message: "User updated." });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
    console.log(error);
  }
} ) ;

router.delete("/user/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err) => {
    err ? res.status(504).send(err) : res.status(200).send("User deleted.");
  } ) ;
} ) ;

connectDB();

app.listen(4000, (err) => {
  err ? console.log(err) : console.log(`Server is running at ${port}`);
} ) ;