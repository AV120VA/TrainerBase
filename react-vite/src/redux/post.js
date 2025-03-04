// import { csrfFetch } from "./csrf";

// const headers = {
//   "Content-Type": "application/json",
// };

//Action Types
const LOAD_POSTS = "posts/LOAD_POSTS";

// Action Creators
const loadPost = (posts) => {
  return {
    type: LOAD_POSTS,
    posts,
  };
};

// Thunks
export const getPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");

  if (response.ok) {
    const data = await response.json();
    const posts = data.posts;
    dispatch(loadPost(posts));
  } else {
    return await response.json();
  }
};

// Reducer

const initialState = {};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      const newPosts = {};
      action.posts.forEach((post) => {
        newPosts[post.id] = post;
      });
      return newPosts;
    default:
      return state;
  }
}

export default postReducer;
