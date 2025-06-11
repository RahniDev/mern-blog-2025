import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import CreatePost from './components/CreatePost/CreatePost'
import EditPost from './components/EditPost'
import DeletePost from './components/DeletePost'
import ReadPost from './components/ReadPost'
import Admin from './components/AdminDashboard/AdminDashboard'

const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:slug/:id' element={<ReadPost />} />
      {/* only authenticated admin can access */}
      <Route path='/new-post' element={<CreatePost />} /> 
      <Route path='/:id/edit' element={<EditPost />} />
      <Route path='/:id' element={<DeletePost />} />
      <Route path="/admin-dashboard" element={<Admin />} />
    </Routes>
  )
}

export default AppRoutes
