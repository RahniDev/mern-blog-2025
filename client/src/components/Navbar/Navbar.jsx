import logo from '../../assets/logo.jpg'
import { Link } from 'react-router-dom'
import { isAuthenticated } from "../Auth/index";
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='nav'>
      <a className="logo" href="/"><img src={logo} alt="Crypto Blog Logo"
      width="90px" /></a>
      <ul>
      </ul>
    </nav>
  )
}

export default Navbar