import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import HomePage from "../components/HomePage/HomePage";
import UserPosts from "../components/UserPosts/UserPosts";
import UserComments from "../components/UserComments";
import PostDetails from "../components/PostDetails/PostDetails";
import SavedPosts from "../components/SavedPosts/SavedPosts";
import CommunitiesList from "../components/CommunitiesLIst";
import CommunityPage from "../components/CommunityPage";
import UserCommunities from "../components/UserCommunities";

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
        path: "my-communities",
        element: <UserCommunities />,
      },
      {
        path: "posts/:postId",
        element: <PostDetails />,
      },
      {
        path: "saved-posts",
        element: <SavedPosts />,
      },
      {
        path: "communities",
        element: <CommunitiesList />,
      },
      {
        path: "communities/:communityId",
        element: <CommunityPage />,
      },
    ],
  },
]);
