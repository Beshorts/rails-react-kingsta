import React, { useState } from "react";

import axios from 'axios';

import { NavLink, withRouter, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import element
import SearchBar from './Search_bar';

function Navbar(props) {

  const { loggedInStatus } = props;
  const {currentUser} = props;
  const [query, setQuery] = useState('');



  // update state with current input in search bar
  const handleSearch = (event)=> {
    event.preventDefault();
    loggedInStatus ? setQuery(event.target.value) : props.history.push('/signup');
  }

  // and store query input state in props location
  const handleSearchSubmit = (event) => {
    const location = {
      pathname: '/search',
      state: event.target.value
    }
    // on press return keyboard (key code 13) redirect on search page
    // and set clear input field
    if (event.keyCode === 13) {
      props.history.push(location);
      setQuery('');
      event.preventDefault();
    }
  }
  // call handleLogout fucntion from App.js
  // server request triggers sessions_controller destroy in Rails and clear localSotrage in browser
  const handleClick = () => {
      axios.delete('/api/logout', {withCredentials: true})
        .then(response => {
          props.handleLogout();
          localStorage.clear();
        })
        .catch(error => console.log(error));
      }

  // using withRouter location.pathname to hide Navbar on specific pages
  // eslint-disable-next-line no-restricted-globals
  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/users/:userId/update' ) {
    return false;
  }

// style NavLink icons
  const iconColor = {
    color: "rgba(9, 4, 70, 1)"
  }
  const iconColorHover = {
    color: "rgba(9, 4, 70, 0.2)"
  }

  // using loggedInStatus to show and hide icons depends on user log
  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-light bg-white static-top" >
      <div className="container d-flex justify-content-between pt-4 pb-2">
        <Link to='/' >
          <div className="navbar-brand">
            <span id="logo-txt-1">K</span>
            <span id="logo-txt-2">insta</span>
          </div>
        </Link>
        <SearchBar
          value={query}
          onChange={handleSearch}
          onKeyDown={handleSearchSubmit}
        />
        { loggedInStatus ?
          <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
        : null }
        { loggedInStatus ?
          <div className="collapse navbar-collapse col-md-3 col-lg-2 px-0" id="navbarSupportedContent" >
            <ul className="navbar-nav ml-auto" >
               {/* add data-toggle and data-target on all nav-item to close navbar toggler on click */}
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"  >
                <NavLink exact to='/' className="nav-link" style={iconColor} activeStyle={iconColorHover} >
                 <FontAwesomeIcon className="navbar-icon home" icon="home"/>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to='#' className="nav-link">
                  <FontAwesomeIcon className="navbar-icon discover" icon="compass"/>
                </NavLink>
              </li>
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <NavLink exact to={`/users/${currentUser.id}`} className="nav-link" style={iconColor} activeStyle={iconColorHover}>
                    <FontAwesomeIcon className="navbar-icon profile" icon="user"/>
                  </NavLink>
              </li>
              <li className="nav-item">
                { loggedInStatus ?
                  <NavLink to='/' className="nav-link" onClick={handleClick} style={iconColor} >
                    <FontAwesomeIcon className="navbar-icon logout" icon="sign-out-alt"/>
                  </NavLink>
                : null }
              </li>
            </ul>
          </div>
        : null }
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
