import { useDispatch } from "react-redux";
import { useState } from "react";
import { createPost, getPosts, getUserPosts } from "../../redux/post";
import "./CreatePost.css";

function CreatePost() {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const validateUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateForm = () => {
    if (
      formData.title.length === 0 ||
      formData.title.length > 50 ||
      formData.content.length > 200 ||
      (imgUrl && !validateUrl(imgUrl))
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImgUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = await dispatch(createPost(formData));
    if (newPost.id) {
      setFormData({
        title: "",
        content: "",
      });

      if (imgUrl) {
        await fetch(`/api/posts/${newPost.id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: imgUrl }),
        });
      }
      setImgUrl("");
      setShowErrors(false);
      await dispatch(getPosts());
      await dispatch(getUserPosts());
    }
  };

  return (
    <div className="new-post-ta">
      <form onSubmit={handleSubmit} className="new-post-input-container">
        <div className="post-input-positioning">
          <div className="new-post-title-url-box">
            <textarea
              className="new-post-input2"
              type="text"
              name="title"
              value={formData.title}
              placeholder="Title..."
              onChange={handleChange}
              onClick={() => setShowErrors(true)}
            ></textarea>
            <textarea
              className="new-post-input2"
              type="text"
              name="imgUrl"
              value={imgUrl}
              placeholder="Image URL..."
              onChange={handleImgUrlChange}
              onClick={() => setShowErrors(true)}
            ></textarea>
          </div>
          <textarea
            className="new-post-input"
            type="text"
            name="content"
            value={formData.content}
            placeholder="What's on your mind?"
            onChange={handleChange}
            onClick={() => setShowErrors(true)}
          ></textarea>
          {showErrors && formData.title.length === 0 ? (
            <p className="post-error-message">Title is required</p>
          ) : null}
          {showErrors && formData.title.length > 50 ? (
            <p className="post-error-message">
              Title cannot be longer than 50 characters
            </p>
          ) : null}
          {showErrors && formData.content.length > 200 ? (
            <p className="post-error-message">
              Content cannot be longer than 200 characters
            </p>
          ) : null}
          {showErrors && imgUrl && !validateUrl(imgUrl) ? (
            <p className="post-error-message">Please provide a valid URL</p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={validateForm() === false ? true : false}
          className="new-post-button"
          style={{
            backgroundColor: !validateForm() ? "gray" : null,
            cursor: !validateForm() ? "not-allowed" : "pointer",
          }}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
