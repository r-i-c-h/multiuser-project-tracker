import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { projectAuth } from '../firebase/config';
import './Navbar.scss'
import Logo from '../assets/logo.svg';

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className='navbar'>
      <ul>
        <li className="app-box">
          <Link to="/" className="app-link">
            <img src={Logo} alt="App Logo" className="app-logo" />
            <span className="app-title">Horizon Key</span>
          </Link>
        </li>
        {!user && <li className='fancylink'><Link to="/login">Login</Link></li>}
        {!user && <li className='fancylink'><Link to="/signup">Signup </Link></li>}
        {user && !isPending && <li><button className="btn" onClick={logout}>Logout</button></li>}
        {user && isPending && <li><button className="btn" disabled>Working</button></li>}
      </ul>
    </nav>
  )
}