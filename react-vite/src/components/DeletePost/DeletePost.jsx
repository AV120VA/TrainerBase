import "./DeletePost.css";

function DeletePost({ postId }) {
  return (
    <div className="delete-post-container">
      <h2>{postId}</h2>
      <p>Delete this bad boy</p>
    </div>
  );
}

export default DeletePost;
