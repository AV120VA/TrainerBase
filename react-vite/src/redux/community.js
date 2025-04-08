// Action Types
const LOAD_COMMUNITIES = "communities/LOAD_COMMUNITIES";

// Action Creators

const loadCommunities = (communities) => {
  return {
    type: LOAD_COMMUNITIES,
    communities,
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
    default:
      return state;
  }
}

export default communityReducers;
