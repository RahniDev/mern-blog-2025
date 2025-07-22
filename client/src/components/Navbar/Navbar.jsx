import logo from '../../assets/logo.jpg'
import { Link } from 'react-router-dom'
import { isAuthenticated } from "../Auth/index";
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='nav'>
      <a className="logo" href="/"><img src={logo} alt="Crypto Blog Logo"
      width="80px" /></a>
      <h1 className='title'>Crypto Blog</h1>
      <ul>
      </ul>
    </nav>
  )
}

export default Navbar