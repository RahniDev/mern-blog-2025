import { Link } from 'react-router-dom'
import './adminDashboard.css'

const Admin = () => {
  return (
    <div><h1>Admin Dashboard</h1>
      <Link to='/new-post'>Create Post</Link>
      <div><h4>Total Posts</h4>
      {/* <p>{allPosts.length}</p> */}
      </div>
    </div>
  )
}

export default Admin