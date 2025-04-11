import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  createCommunity,
  getCommunities,
  getUserCommunities,
} from "../../redux/community";
import "./CreateCommunity.css";

function CreateCommunity() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const disableMe =
    formData.name.length === 0 ||
    formData.name[0] === " " ||
    formData.description.length === 0 ||
    formData.description[0] === " ";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCommunity = await dispatch(createCommunity(formData));

    if (newCommunity.id) {
      setFormData({
        name: "",
        description: "",
      });

      setShowErrors(false);
      if (location.pathname.endsWith("/my-communities")) {
        await dispatch(getUserCommunities());
      } else {
        await dispatch(getCommunities());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-community-form">
      <div className="create-community-inputs">
        <input
          className="create-community-name create-community-input"
          type="text"
          name="name"
          placeholder="Name Your Community..."
          value={formData.name}
          onChange={handleChange}
          onClick={() => setShowErrors(true)}
        />
        {showErrors &&
        (formData.name.length === 0 || formData.name[0] === " ") ? (
          <p className="create-community-error">Name is required</p>
        ) : null}
        <textarea
          className="create-community-description create-community-input"
          placeholder="Description..."
          name="description"
          value={formData.description}
          onChange={handleChange}
          onClick={() => setShowErrors(true)}
        ></textarea>

        {showErrors &&
        (formData.description.length === 0 ||
          formData.description[0] === " ") ? (
          <p className="create-community-error">Description is required</p>
        ) : null}
      </div>
      <button
        disabled={disableMe}
        style={{
          backgroundColor: disableMe ? "gray" : "#f41723",
          cursor: disableMe ? "not-allowed" : "pointer",
        }}
        type="submit"
        className="submit-community-button"
      >
        Submit
      </button>
    </form>
  );
}

export default CreateCommunity;
