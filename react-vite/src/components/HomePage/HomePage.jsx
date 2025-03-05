import Post from "../Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../redux/post";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { allPosts } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(getPosts()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (allPosts) {
      setPosts(
        Object.values(allPosts).sort((a, b) => {
          if (!a.created_at) return 1;
          if (!b.created_at) return -1;
          return a.created_at - b.created_at;
        })
      );
    }
  }, [allPosts]);

  return (
    <>
      {isLoaded && (
        <div className="home-page-container">
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
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
