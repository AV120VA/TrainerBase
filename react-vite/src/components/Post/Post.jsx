import "./Post.css";

function Post({ post }) {
  return (
    <div className="post-container">
      <div className="post-author-info">
        <p className="author-name" style={{ color: "red" }}>
          ADD INFO TO BACKEND ROUTE
        </p>
      </div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Likes: {post.likes}</p>
    </div>
  );
}

export default Post;
