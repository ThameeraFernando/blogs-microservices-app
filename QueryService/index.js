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
  res.status(201).send({ status: "OK" });
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(PORT, () => {
  console.log(`Query service is listening to PORT ${PORT}`);
});
