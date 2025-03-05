import "./Post.css";

function Post({ post }) {
  return (
    <div className="post-container">
      <div className="post-author-info">
        <button disabled={true} className="username-initial-circle">
          {post.User.username.slice(0, 1).toUpperCase()}
        </button>
        <div className="author-timestamp-box">
          <h3 className="post-text">{post.User.username}</h3>
          <p className="post-text">{post.created_at.slice(0, 16)}</p>
        </div>
      </div>
      <h3 className="post-text post-title">{post.title}</h3>
      <p className="post-text post-content">{post.content}</p>
      {post.PostImage && <img src={post.PostImage} alt="post" />}
    </div>
  );
}

export default Post;
