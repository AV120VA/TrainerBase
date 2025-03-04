import Post from "../Post";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="new-post-ta">
        <textarea
          className="new-post-input"
          placeholder="What's on your mind?"
        ></textarea>
        <button className="new-post-button">Publish</button>
      </div>
      <Post />
    </div>
  );
}

export default HomePage;
