import { csrfFetch } from "./csrf";

// const headers = {
//   "Content-Type": "application/json",
// };
import { createSelector } from "reselect";

// Action Types
const LOAD_POST_COMMENTS = "comments/LOAD_POST_COMMENTS";
const LOAD_USER_COMMENTS = "comments/LOAD_USER_COMMENTS";

// Action Creators
const loadPostComments = (postId, comments) => {
  return {
    type: LOAD_POST_COMMENTS,
    postId,
    comments,
  };
};

const loadUserComments = (comments) => {
  return {
    type: LOAD_USER_COMMENTS,
    comments,
  };
};

// Thunks
export const getPostComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/post/${postId}`);

  if (response.ok) {
    const data = await response.json();
    const comments = data.Comments;
    dispatch(loadPostComments(postId, comments));
  } else {
    return await response.json();
  }
};

export const getUserComments = () => async (dispatch) => {
  const response = await csrfFetch("/api/comments/current");

  if (response.ok) {
    const data = await response.json();
    const comments = data.Comments;
    dispatch(loadUserComments(comments));
  } else {
    return await response.json();
  }
};

// Reducer

const initialState = {
  allComments: {},
  postComments: {},
  userComments: {},
};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POST_COMMENTS: {
      const { postId, comments } = action;
      const newComments = {};
      comments.forEach((comment) => {
        newComments[comment.id] = comment;
      });
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [postId]: newComments,
        },
        allComments: {
          ...state.allComments,
          ...newComments,
        },
      };
    }
    case LOAD_USER_COMMENTS: {
      const newComments = {};
      action.comments.forEach((comment) => {
        newComments[comment.id] = comment;
      });
      return { ...state, userComments: newComments };
    }
    default:
      return state;
  }
}

// Selectors
const selectCommentsState = (state) => state.comments;

export const selectPostComments = createSelector(
  [selectCommentsState, (state, postId) => postId],
  (commentsState, postId) => commentsState.postComments[postId] || {}
);

export default commentReducer;
