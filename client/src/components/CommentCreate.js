import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
        content: comment,
      });
    } catch (error) {
      console.error(error);
    }
    setComment("");
  };
  return (
    <>
      <input
        type="text"
        placeholder="add comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default CommentCreate;
