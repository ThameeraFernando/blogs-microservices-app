const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 7000;

app.post("/events", async (req, res) => {
  //   try {
  const event = req.body;
  await axios.post("http://localhost:5000/events", event);
  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  res.send({ status: "OK" });
  //   } catch (error) {
  //     res.send({ status: "Failed" });
  //   }
});

app.listen(PORT, () => {
  console.log(`Event bus is listening to port ${PORT}`);
});
