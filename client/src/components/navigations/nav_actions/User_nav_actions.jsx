import React from 'react';

import { Route, NavLink, useRouteMatch } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import component
import UserPostsIndex from '../../posts/posts_index/User_posts_index';


const UserNavActions = (props) => {
  /* use useRouteMatch hook to build relative path from UserProfile
  and 'url' relative links for nested child routes */
  let { path, url } = useRouteMatch();
  return(
    <section className="user-profile-body">
      <section className="container user-nav-profile-actions mt-4">
        <nav className="row user-nav-profile-actions justify-content-center">
          <div className="nav-actions col-12">
            <NavLink exact={true} activeClassName='active-link' to={`${url}`} >
              <div className="actions action-one">
                <div className="actions-icon">
                  <FontAwesomeIcon className="nav-actions-icons posts-index" icon="th"/>
                </div>
              </div>
            </NavLink>
            <div className="actions action-two">
              <div className="actions-icon">
                <FontAwesomeIcon className="nav-actions-icons video-index" icon="tv"/>
              </div>
            </div>
            <div className="actions action-three">
              <div className="actions-icon">
                <FontAwesomeIcon className="nav-actions-icons bookmark-index" icon="bookmark"/>
              </div>
            </div>
            <div className="actions action-four">
              <div className="actions-icon">
                <FontAwesomeIcon className="nav-actions-icons tags-index" icon="tag"/>
              </div>
            </div>
          </div>
        </nav>
      </section>
        <Route exact path={`${path}`}>
          <UserPostsIndex />
        </Route>
    </section>
  )
}

export default UserNavActions;
