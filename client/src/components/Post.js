import React from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const Post = ({ post }) => {
  const { title } = post;

  return (
    <div className="post">
      <h3>{title}</h3>
      <CommentList postId={post.id} />
      <CommentCreate postId={post.id} />
    </div>
  );
};

export default Post;
