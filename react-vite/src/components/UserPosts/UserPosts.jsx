import { getUserPosts } from "../../redux/post";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post";
import "./UserPosts.css";

function UserPosts() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { userPosts } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(getUserPosts()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (userPosts) {
      setPosts(
        Object.values(userPosts).sort((a, b) => {
          if (!a.created_at) return 1;
          if (!b.created_at) return -1;
          return a.created_at - b.created_at;
        })
      );
    }
  }, [userPosts]);

  return (
    <>
      {isLoaded && (
        <div className="user-posts-container">
          <h2 className="user-posts-header">My Posts</h2>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default UserPosts;
