import './Navbar.scss'
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <ul>
        <li className="logo">
          <Link to="/" className="homelink">
            <img src={Logo} alt="App Logo" />
            <span>Horizon Key</span>
          </Link>
        </li>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup </Link></li>
        <li>
          <button className="btn">Logout</button>
        </li>
      </ul>
    </nav>
  )
}