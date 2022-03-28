import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { projectAuth } from '../firebase/config';

import './Navbar.scss'
import Logo from '../assets/logo.svg';

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const isUserLoggedIn = projectAuth.currentUser === null ? false : true;

  return (
    <nav className='navbar'>
      <ul>
        <li className="logo">
          <Link to="/" className="homelink">
            <img src={Logo} alt="App Logo" />
            <span>Horizon Key</span>
          </Link>
        </li>

        {!isUserLoggedIn && <li><Link to="/login">Login</Link></li>}
        {!isUserLoggedIn && <li><Link to="/signup">Signup </Link></li>}
        <li>
          {isUserLoggedIn && !isPending && <button className="btn" onClick={logout}>Logout</button>}
          {isUserLoggedIn && isPending && <button className="btn" disabled>Working</button>}
        </li>
      </ul>
    </nav>
  )
}