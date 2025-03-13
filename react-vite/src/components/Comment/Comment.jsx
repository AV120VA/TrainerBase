import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteComment from "../DeleteComment/DeleteComment";
import EditComment from "../EditComment/EditComment";
import "./Comment.css";

function Comment({ comment, postId }) {
  const [showMore, setShowMore] = useState(false);
  const user = useSelector((state) => state.session.user);
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
    <div className="comment-box">
      <div className="comment-author-info">
        <div className="comment-header-org-box">
          <button disabled={true} className="comment-username-initial-circle">
            {comment.User.username.slice(0, 1).toUpperCase()}
          </button>
          <div className="comment-author-timestamp-box">
            <h3 className="comment-text">{comment.User.username}</h3>
            <p className="comment-text">{comment.created_at.slice(0, 16)}</p>
          </div>
          {comment.created_at !== comment.updated_at ? (
            <p className="comment-edited-tag">(Edited)</p>
          ) : null}
        </div>
        <div className="comment-more-box" ref={moreOptionsRef}>
          {user && user.id === comment.User.user_id ? (
            <>
              <button
                onClick={() => setShowMore(!showMore)}
                className="comment-more"
              >
                ...
              </button>
              {showMore && (
                <div className="comment-more-options-box">
                  {user && user.id === comment.User.user_id ? (
                    <>
                      <OpenModalButton
                        className={"comment-more-options comment-more-edit"}
                        buttonText="Edit"
                        modalComponent={
                          <EditComment comment={comment} postId={postId} />
                        }
                      />
                      <OpenModalButton
                        className={"comment-more-options comment-more-delete"}
                        buttonText="Delete"
                        modalComponent={
                          <DeleteComment
                            postId={postId}
                            commentId={comment.id}
                          />
                        }
                      />
                    </>
                  ) : null}
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
      <div className="comment-content-box">
        <p className="comment-text comment-content">{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
