import "./Post.css";

function Post({ post }) {
  return (
    <div className="post-container">
      <div className="post-header-box">
        <div className="post-author-info">
          <button disabled={true} className="username-initial-circle">
            {post.User.username.slice(0, 1).toUpperCase()}
          </button>
          <div className="author-timestamp-box">
            <h3 className="post-text">{post.User.username}</h3>
            <p className="post-text">{post.created_at.slice(0, 16)}</p>
          </div>
        </div>
        <button className="post-more">...</button>
      </div>
      <h3 className="post-text post-title">{post.title}</h3>
      <p className="post-text post-content">{post.content}</p>
      {post.PostImage && (
        <img src={post.PostImage} alt="post" style={{ borderRadius: "18px" }} />
      )}
      <div className="post-reactions">
        <img
          src="/thumbs-up.png"
          alt="thumbs up"
          className="like-button-image"
        />
        <img src="/chat.png" alt="comment" className="comment-button-image" />
      </div>
    </div>
  );
}

export default Post;
