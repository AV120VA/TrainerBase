import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { selectPostComments } from "../../redux/comment";
import CreateComment from "../CreateComment/CreateComment";
import Comment from "../Comment/Comment";
import { getPostById } from "../../redux/post";
import { getPostComments } from "../../redux/comment";
import "./PostDetails.css";
import OpenModalButton from "../OpenModalButton";
import EditPost from "../EditPost";
import { useNavigate } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.posts.postById);
  const user = useSelector((state) => state.session.user);
  const moreOptionsRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPostById(postId)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      dispatch(getPostComments(post.id));
    }
  }, [dispatch, post]);

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

  const postComments = useSelector((state) =>
    selectPostComments(state, post ? post.id : null)
  );
  const comments = postComments
    ? Object.values(postComments).sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      })
    : [];

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-details-box">
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
                              <EditPost postImg={post.PostImage} post={post} />
                            }
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
            alt="post"
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
            {comments && <p className="like-count">{comments.length}</p>}
            <img
              src="/chat.png"
              alt="comment"
              className="pd-comment-button-image"
            />
          </div>
        </div>
        <div className="post-details-comments-box">
          {user ? <CreateComment postId={post.id} /> : null}
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.id} postId={post.id} comment={comment} />
            ))}
          {comments && comments.length === 0 ? (
            <p className="be-first-comment">Be The First To Comment!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
