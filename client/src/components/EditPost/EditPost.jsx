import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      setValues({ ...values, title: data.title, body: data.body });
      setPost({ title: values.title, body: values.body })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getSinglePost()
  })

  useEffect(() => {
    setPost({ ...values });
  }, [values.title, values.body]);

  const editPost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${params.id}/edit`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
      const data = await response.json()
       setValues({
            ...values,
            title: data.title,
            body: data.body,
            updatedPost: data.title,
            error: "",
          });
          console.log({data});
    } catch (err) {
      console.error(err)
       setValues({ ...values, error: err });
    }}

    const handleChange = (name) => (event) => {
      setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, error: "" });
      setPost({ title: values.title, body: values.body }); 
    };
useEffect(() => {
  editPost()
}, [])
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