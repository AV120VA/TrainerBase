import "./DeleteCommunity.css";

function DeleteCommunity({ communityId }) {
  return (
    <div className="delete-post-container">
      <h3 className="delete-post-header">
        Do you want to delete this community?
      </h3>
      <div className="delete-post-buttons">
        <button className="delete-community-button post-delete-confirm">
          Confirm
        </button>
        <button className="delete-community-button post-delete-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCommunity;
