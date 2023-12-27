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
          return (
            <li key={comment.id}>
              {comment.status === "approved"
                ? comment.content
                : comment.status === "pending"
                ? "This comment need to be moderated"
                : "This comments violated the community guidelines"}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CommentList;
