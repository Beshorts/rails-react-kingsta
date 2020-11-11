import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostCard = (props) => {

  return(
    <div className="row post-user ">
      <div className=" container post-user-contents col-12 col-lg-8 px-0">
        <header className="post-header p-3">
          <div className="avatar-username-header">
          <div className="user-post-avatar">
            {props.avatar}
            </div>
            <h6 className="user-username-header mb-0">{props.username}</h6>
          </div>
          <div className="header-btn-icon">
            <FontAwesomeIcon id="header-action" icon="ellipsis-h" />
          </div>
        </header>
        <div className="user-post-image">
          {props.images}
        </div>
        <main className="post-body p-3">
          <div className="body-btn-icons">
            <FontAwesomeIcon className="body-action" icon="heart" />
            <FontAwesomeIcon className="body-action" icon="comment" />
            <FontAwesomeIcon className="body-action" icon="paper-plane" />
          </div>
          <h6 className="username-description-texts mb-3 mt-3">
            <span className="user-username-body">
              {props.username}
            </span>
            <span className="post-description">
              {props.description}
            </span>
          </h6>
        </main>
      </div>
    </div>
  )
}
export default PostCard;
