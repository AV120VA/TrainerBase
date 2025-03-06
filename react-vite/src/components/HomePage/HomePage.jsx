import Post from "../Post";
import CreatePost from "../CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../redux/post";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { allPosts } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session.user);
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
          {user && <CreatePost />}
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
