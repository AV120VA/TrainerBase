import {
  deleteComment,
  getPostComments,
  getUserComments,
} from "../../redux/comment";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteComment.css";

function DeleteComment({ commentId, postId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const dispatchDelete = async () => {
    try {
      await dispatch(deleteComment(commentId));
      if (postId) {
        await dispatch(getPostComments(postId));
      }
      await dispatch(getUserComments());
      setModalContent(null);
    } catch (e) {
      console.error("Error deleting comment:", e);
    }
  };

  return (
    <div className="delete-post-container">
      <h3 className="delete-post-header">Confirm Delete?</h3>
      <div className="delete-post-buttons">
        <button
          onClick={dispatchDelete}
          className="delete-post-button post-delete-confirm"
        >
          Confirm
        </button>
        <button
          onClick={() => {
            setModalContent(null);
          }}
          className="delete-post-button post-delete-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteComment;
