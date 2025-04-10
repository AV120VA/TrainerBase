import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CommunityPage.css";
import { getCommunityById } from "../../redux/community";
import { getCommunityPosts } from "../../redux/post";
import Post from "../Post/Post";

function CommunityPage() {
  const dispatch = useDispatch();
  const { communityId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const community = useSelector((state) => state.communities.communityById);
  const { communityPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getCommunityById(communityId));
  }, [dispatch, communityId]);

  useEffect(() => {
    dispatch(getCommunityPosts(communityId)).then(() => setIsLoaded(true));
  }, [dispatch, communityId]);

  useEffect(() => {
    if (communityPosts) {
      setPosts(
        Object.values(communityPosts).sort((a, b) => {
          if (!a.created_at) return 1;
          if (!b.created_at) return -1;
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
    }
  }, [communityPosts]);

  return (
    <>
      {isLoaded && (
        <div className="community-page-container">
          <div className="community-header-box">
            <div className="community-header-and-options">
              <h2
                style={{
                  background: "linear-gradient(90deg, #f41624, white)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="community-page-header"
              >
                Welcome to {"p/" + community.name}!
              </h2>
              <button className="new-community-post-button">+ Post</button>
            </div>
            <div className="community-description-box">
              <p className="community-page-description">
                {community.description}
              </p>
            </div>
          </div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          {posts.length === 0 ? (
            <p
              style={{
                background: "linear-gradient(90deg, #f41624, white)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="convo-started"
            >
              No posts yet, get the conversation going!
            </p>
          ) : null}
        </div>
      )}
    </>
  );
}

export default CommunityPage;
