import { useDispatch } from "react-redux";
import { useState } from "react";
import { createComment, getPostComments } from "../../redux/comment";
import "./CreateComment.css";

function CreateComment({ postId }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: "",
    post_id: postId,
  });
  const [showErrors, setShowErrors] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = { ...formData, post_id: postId };

    const newComment = await dispatch(createComment(commentData));
    if (newComment.id) {
      setFormData({
        content: "",
      });
    }
    setShowErrors(false);
    await dispatch(getPostComments(postId));
  };

  return (
    <div className="create-comment-box">
      <form onSubmit={handleSubmit} className="create-comment-form">
        <textarea
          onChange={handleChange}
          name="content"
          value={formData.content}
          className="create-comment-input"
          placeholder="Comment..."
          onClick={() => setShowErrors(true)}
        />
        <button
          disabled={
            formData.content.length === 0 || formData.content[0] === " "
              ? true
              : false
          }
          style={{
            backgroundColor:
              formData.content.length === 0 ||
              formData.content[0] === " " ||
              formData.content.length > 200
                ? "gray"
                : null,
            cursor:
              formData.content.length === 0 || formData.content[0] === " "
                ? "not-allowed"
                : "pointer",
          }}
          className="create-comment-submit"
          type="submit"
        >
          Comment
        </button>
      </form>
      {showErrors &&
      (formData.content.length === 0 || formData.content[0] === " ") ? (
        <p className="create-comment-error">Comment cannot be empty</p>
      ) : null}
      {showErrors && formData.content.length > 200 ? (
        <p className="create-comment-error">
          Comment cannot be longer than 200 characters
        </p>
      ) : null}
    </div>
  );
}

export default CreateComment;
