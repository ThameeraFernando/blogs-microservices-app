const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 7000;

app.post("/events", async (req, res) => {
  try {
    const event = re.body;
    await axios.post("http://localhost:5000/events", event);
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:6000/events", event);
    res.send({ status: "OK" });
  } catch (error) {
    res.send({ status: "Failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Event bus is listening to port ${PORT}`);
});
