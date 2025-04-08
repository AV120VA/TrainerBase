import { getCommunities } from "../../redux/community";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./CommunitiesList.css";

function CommunitiesList() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { allCommunities } = useSelector((state) => state.communities);
  // const user = useSelector((state) => state.session.user);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    dispatch(getCommunities()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (allCommunities) {
      setCommunities(
        Object.values(allCommunities).sort((a, b) => {
          if (!a.created_at) return 1;
          if (!b.created_at) return -1;
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
    }
  }, [allCommunities]);

  return (
    <>
      {isLoaded && (
        <div className="communities-list-page-container">
          <input
            className="community-search"
            type="text"
            placeholder="Search communities..."
          />
          <div className="communities-list-container">
            {communities.map((community) => (
              <>
                <div key={community.id} className="community-card">
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
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CommunitiesList;
