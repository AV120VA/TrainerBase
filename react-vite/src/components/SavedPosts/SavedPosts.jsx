import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSavedPosts } from "../../redux/post";
import "./SavedPosts.css";

function SavedPosts() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { savedPosts } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(getSavedPosts()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (savedPosts) {
      setPosts(
        Object.values(savedPosts).sort((a, b) => {
          if (!a.created_at) return 1;
          if (!b.created_at) return -1;
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
    }
  }, [savedPosts]);

  return (
    <>
      {isLoaded && (
        <div className="saved-posts-page">
          <h2 className="saved-posts-header">My Saved Posts</h2>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default SavedPosts;
