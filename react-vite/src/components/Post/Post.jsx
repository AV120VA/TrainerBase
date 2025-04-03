import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeletePost from "../DeletePost/DeletePost";
import EditPost from "../EditPost";
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import { getPostComments } from "../../redux/comment";
import { selectPostComments } from "../../redux/comment";
import { csrfFetch } from "../../redux/csrf";
import { getPosts, getSavedPosts } from "../../redux/post";
import "./Post.css";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.session.user);
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const moreOptionsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const postComments = useSelector((state) =>
    selectPostComments(state, post.id)
  );
  const comments = Object.values(postComments).sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const handlePostUnsave = async (postId) => {
    try {
      const response = await csrfFetch(`/api/posts/${postId}/unsave`, {
        method: "DELETE",
      });

      if (response.ok) {
        if (location.pathname.endsWith("/saved-posts")) {
          await dispatch(getSavedPosts());
        } else {
          await dispatch(getPosts());
        }
        setIsSaved(false);
      } else {
        console.error("Failed to unsave post");
      }
    } catch (error) {
      console.error("Error unsaving post:", error);
    }
  };

  const handlePostSave = async (postId) => {
    try {
      const response = await csrfFetch(`/api/posts/${postId}/save`, {
        method: "POST",
      });

      if (response.ok) {
        await dispatch(getPosts());
        setIsSaved(true);
      } else {
        console.error("Failed to save post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetch(`/api/posts/${post.id}/saved`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.saved !== undefined) {
            setIsSaved(data.saved);
          }
        })
        .catch((error) => {
          console.error("Error fetching saved status:", error);
        });
    }
  }, [post.id, user]);

  useEffect(() => {
    dispatch(getPostComments(post.id)).then(() => setIsLoaded(true));
  }, [dispatch, post.id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(event.target)
      ) {
        setShowMore(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreOptionsRef]);

  return (
    <>
      {isLoaded && (
        <div className="post-container">
          <div className="post-header-box">
            <div
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
              style={{ cursor: "pointer" }}
              className="post-author-info"
            >
              <button disabled={true} className="username-initial-circle">
                {post.User.username.slice(0, 1).toUpperCase()}
              </button>
              <div className="author-timestamp-box">
                <h3 className="post-text">{post.User.username}</h3>
                <p className="post-text">{post.created_at.slice(0, 16)}</p>
              </div>
            </div>
            <div className="post-more-box">
              <div className="post-more-box" ref={moreOptionsRef}>
                {user ? (
                  <>
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="post-more"
                    >
                      ...
                    </button>
                    {showMore && (
                      <div className="post-more-options-box">
                        {user.id === post.User.user_id ? (
                          <>
                            <OpenModalButton
                              className={"post-more-options post-more-edit"}
                              buttonText="Edit"
                              modalComponent={
                                <EditPost
                                  postImg={post.PostImage}
                                  post={post}
                                />
                              }
                            />
                            <OpenModalButton
                              className={"post-more-options post-more-delete"}
                              buttonText="Delete"
                              modalComponent={<DeletePost postId={post.id} />}
                            />
                          </>
                        ) : isSaved ? (
                          <button
                            onClick={() => handlePostUnsave(post.id)}
                            className="post-more-options post-more-save"
                          >
                            Unsave
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePostSave(post.id)}
                            className="post-more-options post-more-save"
                          >
                            Save for Later
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              navigate(`/posts/${post.id}`);
            }}
            style={{ cursor: "pointer" }}
            className="post-title-box"
          >
            <h3 className="post-text post-title">{post.title}</h3>
          </div>
          <div
            onClick={() => {
              navigate(`/posts/${post.id}`);
            }}
            style={{ cursor: "pointer" }}
            className="post-content-box"
          >
            <p className="post-text post-content">{post.content}</p>
          </div>
          {post.PostImage && (
            <img
              src={post.PostImage}
              alt="404 Post Image Not Found"
              style={{ borderRadius: "18px", cursor: "pointer" }}
              className="post-image"
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
            />
          )}
          <div className="post-reactions">
            <img
              src="/thumbs-up.png"
              alt="thumbs up"
              className="like-button-image"
              onClick={() => alert("Feature coming soon!")}
            />
            <div className="like-box">
              {comments && (
                <p
                  style={{
                    filter: showComments
                      ? " grayscale(0%)"
                      : " grayscale(100%)",
                  }}
                  className="like-count"
                >
                  {comments.length}
                </p>
              )}
              <img
                src="/chat.png"
                alt="comment"
                className="comment-button-image"
                onClick={() => setShowComments(!showComments)}
                style={{
                  filter: showComments ? " grayscale(0%)" : " grayscale(100%)",
                }}
              />
            </div>
          </div>
          <div
            className="comments-box"
            style={{
              display: showComments ? "flex" : "none",
            }}
          >
            {user ? <CreateComment postId={post.id} /> : null}
            {showComments &&
              comments &&
              comments.map((comment) => (
                <Comment key={comment.id} postId={post.id} comment={comment} />
              ))}
            {showComments && comments && comments.length === 0 ? (
              <p className="be-first-comment">Be The First To Comment!</p>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
