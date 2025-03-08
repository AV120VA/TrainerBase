import { csrfFetch } from "./csrf";

const headers = {
  "Content-Type": "application/json",
};

//Action Types
const LOAD_POSTS = "posts/LOAD_POSTS";
const LOAD_USER_POSTS = "posts/LOAD_USER_POSTS";
const ADD_POST = "posts/ADD_POST";
const DELETE_POST = "posts/DELETE_POST";
const UPDATE_POST = "posts/UPDATE_POST";

// Action Creators
const loadPost = (posts) => {
  return {
    type: LOAD_POSTS,
    posts,
  };
};

const loadUserPosts = (posts) => {
  return {
    type: LOAD_USER_POSTS,
    posts,
  };
};

const addPost = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

const removePost = (postId) => {
  return {
    type: DELETE_POST,
    postId,
  };
};

const editPost = (post) => {
  return {
    type: UPDATE_POST,
    post,
  };
};

// Thunks
export const getPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");

  if (response.ok) {
    const data = await response.json();
    const posts = data.Posts;
    dispatch(loadPost(posts));
  } else {
    return await response.json();
  }
};

export const getUserPosts = () => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/current`);

  if (response.ok) {
    const data = await response.json();
    const posts = data.Posts;
    dispatch(loadUserPosts(posts));
  } else {
    return await response.json();
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/posts/", {
      method: "POST",
      headers,
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const post = await response.json();
      dispatch(addPost(post));
      return post;
    } else {
      const error = await response.json();
      throw new error(error.message);
    }
  } catch (e) {
    console.log("Error adding post:", e);
    return e;
  }
};

export const updatePost = (postId, postData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(postData),
    });
    const updatedPost = await response.json();
    dispatch(editPost(updatedPost));
    return updatedPost;
  } catch (e) {
    console.error("Error updating post:", e);
    return e;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(removePost(postId));
      return response;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (e) {
    console.log("Error deleting post:", e);
    return e;
  }
};

// Reducer

const initialState = {
  allPosts: {},
  userPosts: {},
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS: {
      const allPosts = {};
      action.posts.forEach((post) => {
        allPosts[post.id] = post;
      });
      return { ...state, allPosts };
    }
    case LOAD_USER_POSTS: {
      const userPosts = {};
      action.posts.forEach((post) => {
        userPosts[post.id] = post;
      });
      return { ...state, userPosts };
    }
    case ADD_POST: {
      const newState = { ...state };
      newState.userPosts[action.post.id] = action.post;
      newState.allPosts[action.post.id] = action.post;
      return newState;
    }
    case UPDATE_POST: {
      const updatedPost = action.payload;
      const currentPost = state.allPosts[updatedPost.id];
      const updatedAllPosts = {
        ...state.allPosts,
        [updatedPost.id]: {
          ...currentPost,
          ...updatedPost,
        },
      };
      const updatedUserPosts = {
        ...state.userPosts,
        [updatedPost.id]: {
          ...currentPost,
          ...updatedPost,
        },
      };
      return {
        ...state,
        allPosts: updatedAllPosts,
        userPosts: updatedUserPosts,
      };
    }
    case DELETE_POST: {
      const newState = { ...state };
      delete newState.userPosts[action.postId];
      return newState;
    }
    default:
      return state;
  }
}

export default postReducer;
