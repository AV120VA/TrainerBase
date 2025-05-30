import { csrfFetch } from "./csrf";

const headers = {
  "Content-Type": "application/json",
};

// Action Types
const LOAD_COMMUNITIES = "communities/LOAD_COMMUNITIES";
const LOAD_USER_COMMUNITIES = "communities/LOAD_USER_COMMUNITIES";
const LOAD_COMMUNITY_BY_ID = "communities/LOAD_COMMUNITY_BY_ID";
const ADD_COMMUNITY = "communities/ADD_COMMUNITY";
const DELETE_COMMUNITY = "communities/DELETE_COMMUNITY";

// Action Creators

const loadCommunities = (communities) => {
  return {
    type: LOAD_COMMUNITIES,
    communities,
  };
};

const loadUserCommunities = (userCommunities) => {
  return {
    type: LOAD_USER_COMMUNITIES,
    userCommunities,
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

const removeCommunity = (communityId) => {
  return {
    type: DELETE_COMMUNITY,
    communityId,
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

export const getUserCommunities = () => async (dispatch) => {
  const response = await fetch("/api/communities/user");

  if (response.ok) {
    const data = await response.json();
    const userCommunities = data.Communities;
    dispatch(loadUserCommunities(userCommunities));
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

export const deleteCommunity = (communityId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/communities/${communityId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(removeCommunity(communityId));
      return response;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (e) {
    console.error("Error deleting community:", e);
    return e;
  }
};

//reducer

const initialState = {
  allCommunities: {},
  communityById: {},
  userCommunities: {},
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
    case LOAD_USER_COMMUNITIES: {
      const userCommunities = {};
      action.userCommunities.forEach((community) => {
        userCommunities[community.id] = community;
      });
      return { ...state, userCommunities };
    }
    case LOAD_COMMUNITY_BY_ID: {
      return { ...state, communityById: action.community };
    }
    case ADD_COMMUNITY: {
      const newState = { ...state };
      newState.allCommunities[action.community.id] = action.community;
      return newState;
    }
    case DELETE_COMMUNITY: {
      const newState = { ...state };
      delete newState.allCommunities[action.communityId];
      return newState;
    }
    default:
      return state;
  }
}

export default communityReducer;
