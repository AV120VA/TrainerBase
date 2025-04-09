// Action Types
const LOAD_COMMUNITIES = "communities/LOAD_COMMUNITIES";
const LOAD_COMMUNITY_BY_ID = "communities/LOAD_COMMUNITY_BY_ID";

// Action Creators

const loadCommunities = (communities) => {
  return {
    type: LOAD_COMMUNITIES,
    communities,
  };
};

const loadCommunityById = (community) => {
  return {
    type: LOAD_COMMUNITY_BY_ID,
    community,
  };
};

// Thunks

export const getCommunities = () => async (dispatch) => {
  const response = await fetch("/api/communities/");

  if (response.ok) {
    const data = await response.json();
    const communities = data.Communities;
    dispatch(loadCommunities(communities));
  } else {
    return await response.json();
  }
};

export const getCommunityById = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}`);

  if (response.ok) {
    const data = await response.json();
    const community = data.Community;
    dispatch(loadCommunityById(community));
    return community;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

//reducer

const initialState = {
  allCommunities: {},
  communityById: {},
};

function communityReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITIES: {
      const allCommunities = {};
      action.communities.forEach((community) => {
        allCommunities[community.id] = community;
      });
      return { ...state, allCommunities };
    }
    case LOAD_COMMUNITY_BY_ID: {
      return { ...state, communityById: action.community };
    }
    default:
      return state;
  }
}

export default communityReducer;
