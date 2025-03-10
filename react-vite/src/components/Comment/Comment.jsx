import "./Comment.css";

function Comment({ comment }) {
  return <p style={{ color: "white" }}>{comment.content}</p>;
}

export default Comment;
