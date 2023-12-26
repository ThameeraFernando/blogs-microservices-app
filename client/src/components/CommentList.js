import React, { useEffect, useState } from "react";

const CommentList = ({ comments }) => {
  const [_comments, setComments] = useState([]);

  useEffect(() => {
    setComments(comments);
  }, []);

  return (
    <>
      <p>
        {_comments.length} comment{_comments.length > 1 ? "s" : ""}
      </p>
      <ul>
        {_comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>;
        })}
      </ul>
    </>
  );
};

export default CommentList;
