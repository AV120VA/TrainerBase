import "./CreatePost.css";

function CreatePost() {
  return (
    <div className="new-post-ta">
      <div className="new-post-input-container">
        <div className="new-post-title-url-box">
          <textarea
            className="new-post-input2"
            placeholder="Title..."
          ></textarea>
          <textarea
            className="new-post-input2"
            placeholder="Image URL..."
          ></textarea>
        </div>
        <textarea
          className="new-post-input"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      <button className="new-post-button">Publish</button>
    </div>
  );
}

export default CreatePost;
