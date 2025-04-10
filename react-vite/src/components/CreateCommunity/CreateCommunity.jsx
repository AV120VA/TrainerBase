import "./CreateCommunity.css";

function CreateCommunity() {
  return (
    <form className="create-community-form">
      <div className="create-community-inputs">
        <input
          className="create-community-name create-community-input"
          type="text"
          placeholder="Name Your Community..."
        />
        <textarea
          className="create-community-description create-community-input"
          placeholder="Description..."
        ></textarea>
      </div>
      <button className="submit-community-button">Submit</button>
    </form>
  );
}

export default CreateCommunity;
