import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthenticated } from "../Auth/index";
import './editPost.css'

const EditPost = () => {
  const [values, setValues] = useState({
    title: "",
    body: "",
    error: "",
    updatedPost: "",
  });

  const [post, setPost] = useState({ title: values.title, body: values.body });
  const { title, body, error, updatedPost } = values;

  const params = useParams();

  const getSinglePost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${params.slug}/${params.id}`)
      const data = await response.json()
      console.log('data: ', data)
      setValues({ ...values, title: data.title, body: data.body });
      setPost({ title: values.title, body: values.body })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getSinglePost(params.slug, params.id)
  }, [])

  useEffect(() => {
    setPost({ ...values });
    console.log('post 2: ', post, values)
  }, [values.title, values.body]);

  const editPost = async () => {
    const formData = new FormData();
    formData.append("title", post.title || "");
    formData.append("body", post.body || "");
    if (values.photo) {
      formData.append("photo", values.photo);
    }
    try {
      const response = await fetch(`/posts/${params.id}/edit`, {
        method: "PUT",
        body: formData
      })

      const data = await response.json()
      setValues({
        ...values,
        updatedPost: data.title,
        error: "",
      });
      return data
    } catch (err) {
      console.error(err)
      setValues({ ...values, error: "Failed to update post." });
    }
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    setPost({ title: values.title, body: values.body });
    editPost()
  };

  const newPostForm = () => (
    <form id="edit-post_form" onSubmit={clickSubmit}>
      <div className="form-group">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setValues({ ...values, photo: e.target.files[0] })}
          className="newpost_field"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("title")}
          type="text"
          name="title"
          className="newpost_field newpost_title"
          value={values.title}
        />
      </div>

      <div className="form-group">
        <textarea
          onChange={handleChange("body")}
          className="newpost_field newpost_body"
          value={body}
          name="body"
        />
      </div>
      <button className="btn publish-post-btn" type="submit">
        Publish
      </button>
    </form>
  );

  const showSuccess = () => (
    <div
      className="success-post update-success"
      style={{ display: updatedPost ? "" : "none" }}>
      <h2>{`Your post has been successfully updated!`}</h2>
    </div>
  );

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  return (
    <>
      <div className="newpost_container">
        {showError()}
        {newPostForm()}
        {showSuccess()}
      </div>
    </>
  );
};

export default EditPost;