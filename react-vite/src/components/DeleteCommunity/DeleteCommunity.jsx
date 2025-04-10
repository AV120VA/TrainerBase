import { deleteCommunity, getCommunities } from "../../redux/community";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteCommunity.css";

function DeleteCommunity({ communityId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const dispatchDelete = async () => {
    try {
      await dispatch(deleteCommunity(communityId));
      await dispatch(getCommunities());
      setModalContent(null);
    } catch (e) {
      console.error("Error deleting community:", e);
    }
  };

  return (
    <div className="delete-post-container">
      <h3 className="delete-post-header">
        Do you want to delete this community?
      </h3>
      <div className="delete-post-buttons">
        <button
          onClick={dispatchDelete}
          className="delete-community-button post-delete-confirm"
        >
          Confirm
        </button>
        <button
          onClick={() => {
            setModalContent(null);
          }}
          className="delete-community-button post-delete-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCommunity;
