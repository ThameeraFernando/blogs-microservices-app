import React, { useState } from "react";
import axios from "axios";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/posts", { title });
    } catch (error) {
      console.log(error);
    }
    setTitle("");
  };
  return (
    <div className="create-post">
      <h1>Create Post</h1>
      <label htmlFor="">Title</label>
      <input
        type="text"
        value={title}
        placeholder="Add a title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
      <div className="divider" />
    </div>
  );
};

export default CreatePost;
