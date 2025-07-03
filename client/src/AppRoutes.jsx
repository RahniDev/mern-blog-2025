import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import CreatePost from './components/CreatePost/CreatePost'
import EditPost from './components/EditPost/EditPost'
import ReadPost from './components/ReadPost/ReadPost'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import AdminLogin from './components/AdminLogin/AdminLogin'
import AdminSignup from './components/AdminLogin/AdminSignup'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
import AdminRoute from "./Auth/AdminRoute";

const AppRoutes = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:slug/:id' element={<ReadPost />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* only authenticated admin can access */}
        <AdminRoute path='/new-post' element={<CreatePost />} />
        <AdminRoute path='/:id/edit' element={<EditPost />} />
        <AdminRoute path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default AppRoutes
