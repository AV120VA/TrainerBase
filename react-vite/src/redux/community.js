import { csrfFetch } from "./csrf";

const headers = {
  "Content-Type": "application/json",
};

// Action Types
const LOAD_COMMUNITIES = "communities/LOAD_COMMUNITIES";
const LOAD_COMMUNITY_BY_ID = "communities/LOAD_COMMUNITY_BY_ID";
const ADD_COMMUNITY = "communities/ADD_COMMUNITY";

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

const addCommunity = (community) => {
  return {
    type: ADD_COMMUNITY,
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

export const createCommunity = (communityData) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/communities/", {
      method: "POST",
      headers,
      body: JSON.stringify(communityData),
    });

    if (response.ok) {
      const community = await response.json();
      dispatch(addCommunity(community));
      return community;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    console.error("ERROR CREATING", error);
    return error;
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
    case ADD_COMMUNITY: {
      const newState = { ...state };
      newState.allCommunities[action.community.id] = action.community;
      return newState;
    }
    default:
      return state;
  }
}

export default communityReducer;
