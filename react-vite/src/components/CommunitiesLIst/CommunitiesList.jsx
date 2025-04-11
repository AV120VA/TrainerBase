import { getCommunities } from "../../redux/community";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CreateCommunity from "../CreateCommunity/CreateCommunity";
import OpenModalButton from "../OpenModalButton";
import DeleteCommunity from "../DeleteCommunity/DeleteCommunity";
import "./CommunitiesList.css";

function CommunitiesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { allCommunities } = useSelector((state) => state.communities);
  const user = useSelector((state) => state.session.user);
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
          <div className="community-list-header-and-button">
            <h2 className="community-list-header">Community Hub</h2>
            {user ? (
              <button
                onClick={() => setShowForm(!showForm)}
                style={{
                  backgroundColor: showForm ? "gray" : "#f41723",
                }}
                className="create-community-button"
              >
                + Community
              </button>
            ) : null}
          </div>
          <input
            className="community-search"
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {showForm && (
            <div className="create-community-form-box">
              {" "}
              <CreateCommunity />{" "}
            </div>
          )}
          <div className="communities-list-container">
            {communities.map((community) => (
              <div key={community.id} className="community-card">
                <div
                  onClick={() => navigate(`/communities/${community.id}`)}
                  className="community-card-box-1"
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
                {user && user.id === community.user_id ? (
                  <OpenModalButton
                    className={"community-card-options"}
                    buttonText={"..."}
                    modalComponent={
                      <DeleteCommunity communityId={community.id} />
                    }
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CommunitiesList;
