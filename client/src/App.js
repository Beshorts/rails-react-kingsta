import React, { useState, useEffect } from 'react';

import axios from 'axios';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// custom routes to render layout for login and signup path
import AppRoutes from './custom_routes/App_routes';

// import initialized context
import UserLogContext from './contexts/UserLogContext';

// import custom layouts
import RegistrationsLayout from './components/layouts/registrations_layout/Registrations_layout';

// import components
import Home from './components/homepage/Home';
import Navbar from './components/navigations/navbar/Navbar';
import LoginForm from './components/forms/Login_form';
import SignupForm from './components/forms/Signup_form';
import UpdateForm from './components/forms/Update_form';
import CreatePostForm from './components/forms/Create_post_form';
import UserProfile from './components/users/User_profile';
import UserPost from './components/posts/user_post/User_post';
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
         faImage,
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
            faImage,
          )


const App = (props) => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});

  /* this response data maintain the logged in status in React
     WITHCREDENTIALS allows Rails server to set and read cookies on front-end's browser
     using localStorage to persist user login status on refresh pages */
  const loginStatus = async () => {
    try {
      const response = await axios.get('/api/logged_in',{currentUser}, {withCredentials: true})
        if (response.data.logged_in) {
          handleLogin(response.data);
        } else if (localStorage.userSession) {
          handleLogin(JSON.parse(localStorage.getItem('currentUser')));
        } else {
          handleLogout();
        }
    } catch(error) {
        throw new Error ('something went wrong');
    }
  };

  useEffect(() => {
    loginStatus(currentUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // logic for current user logs
  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setCurrentUser(data.user);
  };
  // logout user acion logic in Navbar, destroy user session in local storage too.
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  return (
    <div className="App">
    <Router>
      {/* navbar available on all paths see exception paths on navbar.js
          create context provider to handle user logs */}
      <UserLogContext.Provider value={{currentUser, handleLogout, isLoggedIn}} >
        <Navbar />
      </UserLogContext.Provider>
      <Switch>
         <Route
            exact path='/'
            render={props => (
              <Home {...props} />
            )}
          />
        <AppRoutes
        // custom routes to render correct layouts on login and signup path
        // login user who already signup
          path='/login'
          layout={props => <UserLogContext.Provider value={{handleLogin}} >
                             <RegistrationsLayout { ...props} />
                           </UserLogContext.Provider>
                 }
          component={props => (
            <LoginForm {...props} />
          )}
        />
        <AppRoutes
           // custom routes to render correct layouts on login and signup path
          // create a new user
          path='/signup'
          layout={props => <UserLogContext.Provider value={{handleLogin}} >
                             <RegistrationsLayout { ...props} />
                           </UserLogContext.Provider>
                 }
          component={props => (
            <SignupForm {...props} />
          )}
        />
        <Route
          // update currentUser info as bio and city
          path='/users/:userId/update'
          render={props => (
            <UpdateForm {...props} />
         )}
        />
        <Route
          // show current user info - nested routes to show user posts and their associated images
          path='/users/:userId'
          render={props =>(
            <UserProfile {...props}
            />
          )}
        />
        <Route
          // create a new current user post
            path='/new_post'
            render={props => <UserLogContext.Provider value={{currentUser}}>
                              <CreatePostForm {...props} />
                             </UserLogContext.Provider>
                   }
          />
        <Route
          // see users and currentUser post on cick
            path='/posts/:postId'
            render={props => <UserLogContext.Provider value={{currentUser}}>
                               <UserPost {...props}  />
                             </UserLogContext.Provider>
                   }
          />
          <Route
          // show results of filtered posts searched by hashtags
            path='/search'
            render={props => (
              <PostsSearched {...props} />
            )}
          />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
