const express = require("express");
const mongoose = require("mongoose");

const app = express(); //server created
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection step- 4
mongoose
  .connect("mongodb://127.0.0.1:27017/session_3")
  .then(() => {
    console.log("connected to DB...");
  })
  .catch((err) => {
    console.log(err);
  });

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const empModel = mongoose.model("emps", empSchema);

app.get("/", (req, res) => {
  res.send("<h1> Hello World </h1>");
});

app.post("/add", async (req, res) => {
  try {
    const data = new empModel(req.body);
    const result = await data.save();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//update
app.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await empModel.findByIdAndUpdate(id, req.body);
    if (result) {
      res.json({ message: "data updated successfully..." });
    } else {
      res.json({ message: "record not found.." });
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/del/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await empModel.findByIdAndDelete(id);
    if (result) {
      res.json({ message: "data deleted successfully..." });
    } else {
      res.json({ message: "not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/show/:id", async (req, res) => {
  try {
    const id= req.params.id;
    const result =await empModel.findById(id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3300, () => {
  console.log("server is running...");
});