import React, { useState } from "react";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const { title, comments } = post;
  const handleSubmit = () => {
    alert(comment);
    setComment("");
  };
  return (
    <div className="post">
      <h3>{title}</h3>
      <p>
        {comments.length} comment{comments.length > 1 ? "s" : ""}
      </p>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>;
        })}
      </ul>
      <input
        type="text"
        placeholder="add comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Post;
