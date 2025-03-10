// import { csrfFetch } from "./csrf";

// const headers = {
//   "Content-Type": "application/json",
// };

// Action Types
const LOAD_POST_COMMENTS = "comments/LOAD_COMMENTS";

// Action Creators
const loadPostComments = (comments) => {
  return {
    type: LOAD_POST_COMMENTS,
    comments,
  };
};

// Thunks
export const getPostComments = (postId) => async (dispatch) => {
  const response = "fill this in";
};

// Reducer

const initialState = {
  postComments: {},
  userComments: {},
};

function commentReducer(state = initialState, action) {}
