import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import {
  updatePost,
  getPosts,
  getUserPosts,
  getPostById,
} from "../../redux/post";
import "./EditPost.css";

function EditPost({ post, postImg }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });
  const [imgUrl, setImgUrl] = useState(postImg);
  const [originalImgUrl] = useState(postImg);
  const [deleteUrl, setDeleteUrl] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const validateUrl = (str) => {
    const urlRegex = /\.(png|jpg|jpeg)$/i;
    return urlRegex.test(str);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updatePost(post.id, { ...formData, id: post.id }));

      if (originalImgUrl && deleteUrl) {
        await fetch(`/api/posts/${post.id}/images`, {
          method: "DELETE",
        });
      } else if (imgUrl !== originalImgUrl) {
        await fetch(`/api/posts/${post.id}/images`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: imgUrl }),
        });
      }

      await dispatch(getPosts());
      await dispatch(getUserPosts());
      await dispatch(getPostById(post.id));

      setModalContent(null);
    } catch (e) {
      console.error(e);
      return e;
    }
  };

  return (
    <div className="edit-post-container">
      <h2 className="edit-post-header">Edit Post</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="edit-post-input-box">
          <p className="edit-post-label">Title:</p>
          <textarea
            className="edit-post-title-ta edit-post-ta-hl"
            value={formData.title}
            onChange={handleChange}
            name="title"
          />
          {formData.title.length === 0 ? (
            <p className="edit-post-error">Title is required</p>
          ) : null}
        </div>
        <div className="edit-post-input-box">
          <p className="edit-post-label">Content:</p>
          <textarea
            className="edit-post-content-ta edit-post-ta-hl"
            value={formData.content}
            onChange={handleChange}
            name="content"
          />
          {formData.content.length > 200 ? (
            <p className="edit-post-error">
              Content cannot exceed 200 characters
            </p>
          ) : null}
        </div>
        <div className="edit-post-input-box">
          <p className="edit-post-label">Image URL:</p>
          <textarea
            className="edit-post-title-ta edit-post-ta-hl"
            value={imgUrl}
            onChange={handleUrlChange}
            name="imgUrl"
          />
          {originalImgUrl && (
            <div className="delete-url-box">
              <input
                type="checkbox"
                id="delete-url"
                name="delete-url"
                className="delete-url-checkbox"
                onClick={() => setDeleteUrl(!deleteUrl)}
              />
              <p className="delete-url-label">Delete Image</p>
            </div>
          )}
          {imgUrl && !validateUrl(imgUrl) ? (
            <p className="edit-post-error">
              URL must end in .png .jpg or .jpeg
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={
            formData.title.length === 0 || formData.content.length > 200
          }
          className="edit-post-submit"
          style={{
            backgroundColor:
              formData.title.length === 0 || formData.content.length > 200
                ? "gray"
                : null,
            cursor: formData.title.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditPost;
