import React from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const Post = ({ post }) => {
  const { title, id, comments } = post;

  return (
    <div className="post">
      <h3>{title}</h3>
      <CommentList comments={comments} />
      <CommentCreate postId={id} />
    </div>
  );
};

export default Post;
