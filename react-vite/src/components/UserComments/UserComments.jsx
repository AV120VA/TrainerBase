import { getUserComments } from "../../redux/comment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import "./UserComments.css";

function UserComments() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const userComments = useSelector((state) => state.comments.userComments);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(getUserComments()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (userComments) {
      setComments(
        Object.values(userComments).sort((a, b) => {
          if (!a.created_at) return 1;
          if (!b.created_at) return -1;
          return new Date(a.created_at) - new Date(b.created_at);
        })
      );
    }
  }, [userComments]);

  return (
    <>
      {isLoaded && (
        <div className="user-comments-box">
          <div className="user-comments-header-box">
            <h2 className="user-comments-header">My Comments</h2>
            <button className="create-comment-toggle">+ Comment</button>
          </div>
          <div className="my-comments-box">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserComments;
