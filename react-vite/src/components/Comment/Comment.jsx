import "./Comment.css";

function Comment({ comment }) {
  return (
    <div className="comment-box">
      <div className="comment-author-info">
        <button disabled={true} className="comment-username-initial-circle">
          {comment.User.username.slice(0, 1).toUpperCase()}
        </button>
        <div className="comment-author-timestamp-box">
          <h3 className="comment-text">{comment.User.username}</h3>
          <p className="comment-text">{comment.created_at.slice(0, 16)}</p>
        </div>
      </div>
      <div className="comment-content-box">
        <p className="comment-text comment-content">{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
