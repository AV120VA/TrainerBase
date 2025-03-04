import React from "react";
import "./Post.css";

function Post({ post }) {
  return (
    <div className="post-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Likes: {post.likes}</p>
    </div>
  );
}

export default Post;
