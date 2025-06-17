import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import CreatePost from './components/CreatePost/CreatePost'
import EditPost from './components/EditPost/EditPost'
import ReadPost from './components/ReadPost/ReadPost'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import Navbar from './components/Navbar/Navbar';

const AppRoutes = () => {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/:slug/:id' element={<ReadPost />} /> */}
      {/* only authenticated admin can access */}
      <Route path='/new-post' element={<CreatePost />} /> 
      <Route path='/:id/edit' element={<EditPost />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
    </>
  )
}

export default AppRoutes
