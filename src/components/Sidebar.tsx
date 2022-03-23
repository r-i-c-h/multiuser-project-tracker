import { NavLink } from "react-router-dom";

import Icon_Dashboard from '../assets/icon_dashboard.svg'
import Icon_Add from '../assets/icon_add.svg';

import './Sidebar.scss'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {/* //TODO: {AVATAR \ Greeting HERE} */}
          <p>Greetings User</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/" exact>
                <img src={Icon_Dashboard} alt="dashboard icon" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={Icon_Add} alt="add new project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}