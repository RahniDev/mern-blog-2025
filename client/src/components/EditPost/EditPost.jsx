import { useEffect, useState } from 'react';
import './editPost.css'

const EditPost = ({ match }) => {
  const [values, setValues] = useState({
    title: "",
    body: "",
    error: "",
    updatedPost: "",
  });

  const [post, setPost] = useState({ title: values.title, body: values.body });
  const { title, body, error, updatedPost } = values;

  const getSinglePost = async (slug, id) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${slug}/${id}`)
      const data = await response.json()
      setValues({ ...values, title: data.title, body: data.body });
      setPost({ title: values.title, body: values.body })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const id = match.params.id;
    const slug = match.params.slug;
    getSinglePost(slug, id)
  })

  useEffect(() => {
    setPost({ ...values });
  }, [values.title, values.body]);


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    setPost({ title: values.title, body: values.body });

    editPost(match.params.id, post).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: data.title,
          body: data.body,
          updatedPost: data.title,
          error: "",
        });
        console.log(data);
      }
    });
  };

  const newPostForm = () => (
    <form className="newpost_form" onSubmit={clickSubmit}>
      <div className="form-group">
        <input
          onChange={handleChange("title")}
          type="text"
          name="title"
          className="newpost_field newpost_title"
          value={title}
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