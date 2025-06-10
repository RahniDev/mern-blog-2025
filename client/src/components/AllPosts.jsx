import { useState, useEffect } from 'react'

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([])
  const [postsList, setPostsList] = useState()

  const getAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts/', {
        method: 'GET'
      });
      const data = await response.json();
      setAllPosts(data);
    } catch (err) {
      console.error(err);
    }
  };
  const getPosts = () => {
    for (let i = 0; i < allPosts.length; i++) {
      let posts = allPosts[i];
      setPostsList(posts);
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  useEffect(() => {
    getPosts()
  }, [allPosts])

  return (
    <>
      {postsList &&
        <div><h2>{postsList.title}</h2><p>{postsList.body}</p></div>
      }
    </>
  )
}

export default AllPosts