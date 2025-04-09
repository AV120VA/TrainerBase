import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CommunityPage.css";
import { getCommunityById } from "../../redux/community";

function CommunityPage() {
  const dispatch = useDispatch();
  const { communityId } = useParams();
  const community = useSelector((state) => state.communities.communityById);

  useEffect(() => {
    dispatch(getCommunityById(communityId));
  }, [dispatch, communityId]);

  return (
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
        <p className="community-page-description">{community.description}</p>
      </div>
    </div>
  );
}

export default CommunityPage;
