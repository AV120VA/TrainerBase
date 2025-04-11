import {
  deletePost,
  getPosts,
  getUserPosts,
  getCommunityPosts,
} from "../../redux/post";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./DeletePost.css";

function DeletePost({ postId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const { communityId } = useParams();

  const dispatchDelete = async () => {
    try {
      await dispatch(deletePost(postId));
      if (communityId) {
        await dispatch(getCommunityPosts(communityId));
      } else {
        await dispatch(getPosts());
        await dispatch(getUserPosts());
      }
      setModalContent(null);
    } catch (e) {
      console.error("Error deleting post:", e);
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

export default DeletePost;
