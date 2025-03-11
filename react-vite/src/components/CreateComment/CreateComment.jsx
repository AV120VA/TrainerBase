import "./CreateComment.css";

function CreateComment() {
  return (
    <div className="create-comment-box">
      <form className="create-comment-form">
        <textarea className="create-comment-input" placeholder="Comment..." />
        <button className="create-comment-submit" type="submit">
          Comment
        </button>
      </form>
    </div>
  );
}

export default CreateComment;
