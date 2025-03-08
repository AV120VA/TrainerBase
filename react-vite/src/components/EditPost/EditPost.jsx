import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/post";
import "./EditPost.css";

function EditPost({ post }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });

  return (
    <div className="edit-post-container">
      <h2 className="edit-post-header">Edit Post</h2>
      <form className="edit-post-form">
        <div className="edit-post-input-box">
          <p className="edit-post-label">Title:</p>
          <textarea
            className="edit-post-title-ta edit-post-ta-hl"
            value={formData.title}
          />
        </div>
        <div className="edit-post-input-box">
          <p className="edit-post-label">Content:</p>
          <textarea
            className="edit-post-content-ta edit-post-ta-hl"
            value={formData.content}
          />
        </div>
        <button className="edit-post-submit">Submit</button>
      </form>
    </div>
  );
}

export default EditPost;
