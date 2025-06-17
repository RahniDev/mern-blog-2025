import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './adminDashboard.css'

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts/');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        }
      })
      const data = await response.json()
      window.confirm("Are you sure you want to permanently delete this post?")
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getAllPosts()
  }, []);

  const displayPosts = (posts) => {
    if (!posts.length)
      return (
        <div className="no-posts">
          <p>You haven't written any posts yet.</p>
        </div>
      );

    return posts.map((post) => (
      <>
        <div className="mypost">
          <Link className="mypost_title" to={`/post/${post.slug}/${post._id}`}>
            <h2 className="mypost_title">{post.title}</h2>
          </Link>
          <div className='post_buttons'>
          <Link
            className="mypost_btn edit_btn"
            to={`/post/${post._id}/edit`}>
            Edit
          </Link>
          {post ? (
            <span
              className="mypost_btn delete_btn"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </span>
            
          ) : (
            ""
          )}
          </div>
        </div>
        <hr className="hr" />
      </>
    ));
  };

  return (
    <div>
      <div className='admin-title-btn'><h1>Admin Dashboard</h1>
      <Link className="create-btn" to='/new-post'>Create Post</Link></div>
      <div className='post-count'><h4 className='post-count_header'>Total Posts</h4>
        <p className='post-count_btn'>{posts.length}</p></div>
        <div>{displayPosts(posts)}</div>;
    </div>
  )
}

export default AdminDashboard