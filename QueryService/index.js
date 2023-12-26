const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

app.use(bodyParser.json());

const posts = {};
const PORT = 4001;

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "PostCreated":
      posts[data.id] = { ...data, comments: [] };
      break;
    case "CommentAdded":
      const comments = posts[data.postId]?.comments;
      comments.push({ id: data.commentId, content: data.content });
      posts[data.postId].comments = comments;
      console.log(posts);
      break;
    default:
      break;
  }
  res.status(201).send({ status: "OK" });
});

app.get("/posts", (req, res) => {
  console.log("here");
  res.send(posts);
});

app.listen(PORT, () => {
  console.log(`Query service is listening to PORT ${PORT}`);
});
