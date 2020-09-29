import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// this nav hasn't "active" navigation yet
const UserNavActions = () => {
  return(
    <nav className="row user-nav-profile-actions justify-content-center">
      <div className="nav-actions col-12">
        <div className="actions action-one">
          <div className="actions-icon">
            <FontAwesomeIcon className="nav-actions-icons posts-index" icon="th"/>
          </div>
        </div>
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
  )
}

export default UserNavActions;
