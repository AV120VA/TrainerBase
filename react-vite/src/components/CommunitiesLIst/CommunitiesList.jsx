import { getCommunities } from "../../redux/community";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "./CommunitiesList.css";

function CommunitiesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { allCommunities } = useSelector((state) => state.communities);
  const rawCommunities = useMemo(
    () => (allCommunities ? Object.values(allCommunities) : []),
    [allCommunities]
  );

  useEffect(() => {
    dispatch(getCommunities()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const communities = useMemo(() => {
    return rawCommunities
      .filter(
        (community) =>
          community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (community.description &&
            community.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        if (!a.created_at) return 1;
        if (!b.created_at) return -1;
        return new Date(b.created_at) - new Date(a.created_at);
      });
  }, [rawCommunities, searchQuery]);

  return (
    <>
      {isLoaded && (
        <div className="communities-list-page-container">
          <h2 className="community-list-header">Community Hub</h2>
          <input
            className="community-search"
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="communities-list-container">
            {communities.map((community) => (
              <div
                key={community.id}
                onClick={() => navigate(`/communities/${community.id}`)}
                className="community-card"
              >
                <button className="community-card-icon">
                  {community.name[0]}
                </button>
                <div className="community-info-box">
                  <h3 className="community-name">{"p/" + community.name}</h3>
                  <p className="community-description">
                    {community.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CommunitiesList;
