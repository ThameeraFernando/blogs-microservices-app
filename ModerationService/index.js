const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the app service");
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "CommentAdded":
      const status = data.content.includes("orange") ? "rejected" : "approved";
      await axios.post("http://localhost:7000/events", {
        type: "CommentModerated",
        data: {
          id: data.commentId,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
      break;

    default:
      break;
  }
  res.send({});
});

const PORT = 4005;

app.listen(PORT, () => {
  console.log(`Moderation service is listening on port ${PORT}`);
});
