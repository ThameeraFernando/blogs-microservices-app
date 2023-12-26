import React, { useEffect, useState } from "react";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([
      {
        id: "id-01",
        title: "test title",
        comments: [{ id: "id-01", content: "test comment" }],
      },
    ]);
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default PostList;
