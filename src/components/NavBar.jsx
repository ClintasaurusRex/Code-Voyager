import { NavLink } from 'react-router-dom';
import './Navbar.css';
import React from 'react';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <ul className='nav-pills'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/projects'
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contact'
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
