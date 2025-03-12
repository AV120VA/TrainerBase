import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeletePost from "../DeletePost/DeletePost";
import EditPost from "../EditPost";
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import { getPostComments } from "../../redux/comment";
import { selectPostComments } from "../../redux/comment";
import "./Post.css";

function Post({ post }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const moreOptionsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const postComments = useSelector((state) =>
    selectPostComments(state, post.id)
  );
  const comments = Object.values(postComments);

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
            <div className="post-author-info">
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
                              modalComponent={<EditPost post={post} />}
                            />
                            <OpenModalButton
                              className={"post-more-options post-more-delete"}
                              buttonText="Delete"
                              modalComponent={<DeletePost postId={post.id} />}
                            />
                          </>
                        ) : (
                          <OpenModalButton
                            className={"post-more-options post-more-save"}
                            buttonText="Save For Later"
                          />
                        )}
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <h3 className="post-text post-title">{post.title}</h3>
          <div className="post-content-box">
            <p className="post-text post-content">{post.content}</p>
          </div>
          {post.PostImage && (
            <img
              src={post.PostImage}
              alt="post"
              style={{ borderRadius: "18px" }}
              className="post-image"
            />
          )}
          <div className="post-reactions">
            <img
              src="/thumbs-up.png"
              alt="thumbs up"
              className="like-button-image"
              onClick={() => alert("Feature coming soon!")}
            />
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
                <Comment key={comment.id} comment={comment} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
