import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import {
  updateComment,
  getPostComments,
  getUserComments,
} from "../../redux/comment";
import "./EditComment.css";

function EditComment({ comment, postId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [formData, setFormData] = useState({
    content: comment.content,
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

    try {
      await dispatch(
        updateComment(comment.id, { ...formData, id: comment.id })
      );
      if (postId) {
        await dispatch(getPostComments(postId));
      }
      await dispatch(getUserComments());
      setModalContent(null);
    } catch (e) {
      console.error(e);
      return e;
    }
  };

  return (
    <div className="edit-comment-container">
      <h2 className="edit-comment-header">Edit Comment</h2>
      <form onSubmit={handleSubmit} className="edit-comment-form">
        <div className="edit-comment-input-box">
          <p className="edit-comment-label">Content:</p>
          <textarea
            className="edit-comment-content-input"
            value={formData.content}
            onChange={handleChange}
            name="content"
            onClick={() => setShowErrors(true)}
          />
          {showErrors &&
          (formData.content.length === 0 || formData.content[0] === " ") ? (
            <p
              style={{ alignSelf: "center", marginTop: "5px" }}
              className="create-comment-error"
            >
              Comment cannot be empty
            </p>
          ) : null}
          {showErrors && formData.content.length > 200 ? (
            <p className="create-comment-error">
              Comment cannot be longer than 200 characters
            </p>
          ) : null}
        </div>
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
          type="submit"
          className="edit-comment-submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditComment;
