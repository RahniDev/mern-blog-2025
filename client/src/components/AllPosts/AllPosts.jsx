import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './allPosts.css'

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([])

  const getAllPosts = async () => {
    try {
      const response = await fetch('/posts/');
      const data = await response.json();
      setAllPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <section className='all-posts'>
        {allPosts && allPosts.map((post) =>
          <Link className="grid_single-post" key={post._id} to={`/${post.slug}/${post._id}`}><div key={post._id}>
             {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                width='100%'
                style={{
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />
            )}
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div></Link>
        )}
    </section>
  )
}

export default AllPosts