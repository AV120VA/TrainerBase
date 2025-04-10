import { csrfFetch } from "./csrf";

const headers = {
  "Content-Type": "application/json",
};

//Action Types
const LOAD_POSTS = "posts/LOAD_POSTS";
const LOAD_POST_BY_ID = "posts/LOAD_POST_BY_ID";
const LOAD_USER_POSTS = "posts/LOAD_USER_POSTS";
const ADD_POST = "posts/ADD_POST";
const DELETE_POST = "posts/DELETE_POST";
const UPDATE_POST = "posts/UPDATE_POST";
const LOAD_SAVED_POSTS = "posts/LOAD_SAVED_POSTS";
const LOAD_COMMUNITY_POSTS = "posts/LOAD_COMMUNITY_POSTS";

// Action Creators
const loadPost = (posts) => {
  return {
    type: LOAD_POSTS,
    posts,
  };
};

const loadPostById = (post) => {
  return {
    type: LOAD_POST_BY_ID,
    post,
  };
};

const loadUserPosts = (posts) => {
  return {
    type: LOAD_USER_POSTS,
    posts,
  };
};

const loadSavedPosts = (posts) => {
  return {
    type: LOAD_SAVED_POSTS,
    posts,
  };
};

const loadCommunityPosts = (posts) => {
  return {
    type: LOAD_COMMUNITY_POSTS,
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

export const getSavedPosts = () => async (dispatch) => {
  const response = await csrfFetch("/api/posts/saved");

  if (response.ok) {
    const data = await response.json();
    const posts = data.Posts;
    dispatch(loadSavedPosts(posts));
  } else {
    return await response.json();
  }
};

export const getCommunityPosts = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}/posts`);

  if (response.ok) {
    const data = await response.json();
    const posts = data.Posts;
    dispatch(loadCommunityPosts(posts));
  } else {
    return await response.json();
  }
};

export const getPostById = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);

  if (response.ok) {
    const post = await response.json();
    dispatch(loadPostById(post));
    return post;
  } else {
    const error = await response.json();
    throw new Error(error.message);
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
      throw new Error(error.message);
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
  postById: {},
  savedPosts: {},
  communityPosts: {},
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
    case LOAD_SAVED_POSTS: {
      const savedPosts = {};
      action.posts.forEach((post) => {
        savedPosts[post.id] = post;
      });
      return { ...state, savedPosts };
    }
    case LOAD_COMMUNITY_POSTS: {
      const communityPosts = {};
      action.posts.forEach((post) => {
        communityPosts[post.id] = post;
      });
      return { ...state, communityPosts };
    }
    case LOAD_POST_BY_ID: {
      return { ...state, postById: action.post };
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
      const updatedPost = action.post;
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
