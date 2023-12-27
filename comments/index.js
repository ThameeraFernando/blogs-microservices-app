const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
const PORT = 5000;

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;
  await axios.post("http://localhost:7000/events", {
    type: "CommentAdded",
    data: { postId: req.params.id, commentId, content, status: "pending" },
  });
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { data, type } = req.body;
  switch (type) {
    case "CommentModerated":
      await axios.post("http://localhost:7000/events", {
        type: "CommentUpdated",
        data: data,
      });
      break;
    default:
      break;
  }
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
