import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeletePost from "../DeletePost/DeletePost";
import "./Post.css";

function Post({ post }) {
  const user = useSelector((state) => state.session.user);
  const [showMore, setShowMore] = useState(false);
  const moreOptionsRef = useRef(null);

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
        <img src={post.PostImage} alt="post" style={{ borderRadius: "18px" }} />
      )}
      <div
        onClick={() => alert("Feature coming soon!")}
        className="post-reactions"
      >
        <img
          src="/thumbs-up.png"
          alt="thumbs up"
          className="like-button-image"
        />
        <img src="/chat.png" alt="comment" className="comment-button-image" />
      </div>
    </div>
  );
}

export default Post;
