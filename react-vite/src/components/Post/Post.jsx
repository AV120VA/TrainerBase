import "./Post.css";

function Post({ post }) {
  return (
    <div className="post-container">
      <div className="post-author-info"></div>
      <h3 className="post-text">{post.User.username}</h3>
      <p className="post-text">{post.created_at.slice(0, 16)}</p>
      <h3 className="post-text">{post.title}</h3>
      <p className="post-text">{post.content}</p>
      {post.PostImage && <img src={post.PostImage} alt="post" />}
    </div>
  );
}

export default Post;
