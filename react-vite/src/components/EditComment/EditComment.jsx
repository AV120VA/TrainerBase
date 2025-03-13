import "./EditComment.css";

function EditComment({ comment, postId }) {
  return (
    <h3 style={{ color: "red" }}>
      {comment.content} {postId}
    </h3>
  );
}

export default EditComment;
