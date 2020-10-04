import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// custom routes to render layout for login and signup path
import AppRoutes from './custom_routes/App_routes';

// import custom layouts
import RegistrationsLayout from './components/layouts/registrations_layout/Registrations_layout';
import UserProfileLayout from './components/layouts/user_profile_layout/User_profile_layout';

// import components
import Home from './components/homepage/Home';
// navigations components
import Navbar from './components/navigations/navbar/Navbar';
import UserNavActions from './components/navigations/nav_actions/User_nav_actions';
// registrations components
import LoginForm from './components/registrations/Login_form';
import SignupForm from './components/registrations/Signup_form';
// user components
import UserProfile from './components/users/User_profile';
// posts components
import UserPostsIndex from './components/posts/posts_index/User_posts_index';
import UserPost from './components/posts/user_post/User_post';
import CreatePost from './components/posts/Create_post';
import PostsSearched from './components/posts/posts_searched/Posts_searched';

// import fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCompass,
         faHome,
         faUser,
         faSignOutAlt,
         faArrowLeft,
         faCog,
         faEdit,
         faMapMarkerAlt,
         faTh,
         faTv,
         faBookmark,
         faTag,
         faHeart,
         faEllipsisH,
         faComment,
         faPaperPlane,
        }from '@fortawesome/free-solid-svg-icons'

library.add(fab,
            faHome,
            faCompass,
            faUser,
            faSignOutAlt,
            faArrowLeft,
            faCog,
            faEdit,
            faMapMarkerAlt,
            faTh,
            faTv,
            faBookmark,
            faTag,
            faHeart,
            faEllipsisH,
            faComment,
            faPaperPlane,
          )
const App = (props) => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ user, setUser ] = useState({});

  /* this response data maintain the logged in status in React
     WITHCREDENTIALS allows Rails server to set and read cookies on front-end's browser
     using localStorage to persist login status user on refresh pages */
  const loginStatus = () => {
    axios.get('/api/logged_in', {withCredentials: true})
      .then(response => {
        console.log(response.data.logged_in);
        console.log(response);
        if (response.data.logged_in) {
          handleLogin(response.data);
        } else if (localStorage.userSession) {
          handleLogin(JSON.parse(localStorage.getItem('currentUser')));
        } else {
          handleLogout();
        }
      }).catch(error => console.log('Something went wrong:', error));
  };
// call loginstatus function on refresh page
useEffect(() => {
  loginStatus();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // logic for current user logs
  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
    console.log(data);
  };
  // logout user acion logic in Navbar, destroy user session in local storage too.
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <div className="App">
    <Router>
      {/* navbar available on all paths see exception  paths on navbar.js */}
      <Navbar  currentUser={user} handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={isLoggedIn} />
      <Switch>
         <Route
            exact path='/'
            render={props => (
              <Home {...props} loggedInStatus={isLoggedIn}/>
            )}
          />
        <AppRoutes
        // custom routes to render correct layouts on login and signup path
        // login user who already signup
          path='/login'
          layout={props => (
            <RegistrationsLayout { ...props} />
          )}
          component={props => (
            <LoginForm {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>
          )}
        />
        <AppRoutes
           // custom routes to render correct layouts on login and signup path
          // create a new user
          path='/signup'
          layout={props => (
            <RegistrationsLayout { ...props} />
          )}
          component={props => (
            <SignupForm {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>
          )}
        />
        <Route
        // currrent user profile shows current user info and posts created
          path='/users/:userId'
          component={props =>(
            <UserProfileLayout handleLogin={handleLogin} loggedInStatus={isLoggedIn}
              user={ <UserProfile {...props} user={user} loggedInStatus={isLoggedIn} />}
              navigation={ <UserNavActions {...props} />}
              posts={ <UserPostsIndex {...props}  loggedInStatus={isLoggedIn} />}
            />
          )}
        />
        <Route
          // see new currentUser post created / destroy it
            path='/posts/:postId'
            render={props => (
              <UserPost {...props} currentUser={user}  loggedInStatus={isLoggedIn} />
            )}
          />
          <Route
          // create a new current user post
            path='/new_post'
            render={props => (
              <CreatePost {...props} user={user} loggedInStatus={isLoggedIn} />
            )}
          />
          <Route
          // results of filtered posts searched by hashtags
            path='/search'
            render={props => (
              <PostsSearched {...props} loggedInStatus={isLoggedIn} />
            )}
          />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
