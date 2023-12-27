const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

app.use(bodyParser.json());

const posts = {};
const PORT = 4001;

const handleEvent = (type, data) => {
  switch (type) {
    case "PostCreated":
      posts[data.id] = { ...data, comments: [] };
      break;
    case "CommentAdded":
      const comments = posts[data.postId]?.comments;
      comments.push({
        id: data.commentId,
        content: data.content,
        status: data.status,
      });
      posts[data.postId].comments = comments;
      break;
    case "CommentUpdated":
      const UpdatedComments = posts[data.postId]?.comments.filter(
        (cmt) => cmt.id !== data.id
      );
      UpdatedComments.push({
        id: data.id,
        content: data.content,
        status: data.status,
      });

      posts[data.postId].comments = UpdatedComments;

      break;
    default:
      break;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.status(201).send({ status: "OK" });
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(PORT, async () => {
  console.log(`Query service is listening to PORT ${PORT}`);
  const res = await axios.get("http://localhost:7000/events");
  for (let event of res.data) {
    console.log("Processing events");
    handleEvent(event.type, event.data);
  }
});
