import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import HomePage from "../components/HomePage/HomePage";
import UserPosts from "../components/UserPosts/UserPosts";
import UserComments from "../components/UserComments";
import PostDetails from "../components/PostDetails/PostDetails";
import SavedPosts from "../components/SavedPosts/SavedPosts";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "my-posts",
        element: <UserPosts />,
      },
      {
        path: "my-comments",
        element: <UserComments />,
      },
      {
        path: "posts/:postId",
        element: <PostDetails />,
      },
      {
        path: "saved-posts",
        element: <SavedPosts />,
      },
    ],
  },
]);
