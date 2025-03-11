import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

const headers = {
  "Content-Type": "application/json",
};

// Action Types
const LOAD_POST_COMMENTS = "comments/LOAD_POST_COMMENTS";
const LOAD_USER_COMMENTS = "comments/LOAD_USER_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";

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

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
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

export const createComment = (commentData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/comments/`, {
      method: "POST",
      headers,
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      const comment = await response.json();
      dispatch(addComment(comment));
      return comment;
    } else {
      const error = await response.json();
      throw new error(error.message);
    }
  } catch (e) {
    console.error(e);
    return e;
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
    case ADD_COMMENT: {
      const newState = { ...state };
      newState.userComments[action.comment.id] = action.comment;
      newState.postComments[action.comment.post_id] = {
        ...newState.postComments[action.comment.post_id],
        [action.comment.id]: action.comment,
      };
      return newState;
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
