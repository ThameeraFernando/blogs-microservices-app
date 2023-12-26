import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/posts/${postId}/comments`
      );
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <p>
        {comments.length} comment{comments.length > 1 ? "s" : ""}
      </p>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>;
        })}
      </ul>
    </>
  );
};

export default CommentList;
