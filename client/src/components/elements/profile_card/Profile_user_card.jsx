import React from 'react';

import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileUserCard = (props) => {
  return (
    <section className="container-infos-actions col-12 col-lg-8">
      <div className="profile-avatar">
        {props.avatar}
      </div>
      <header className="profile-infos">
        <h4 className="user-username">
          {props.username}
        </h4>
        <h5 className="user-bio">
          {props.bio}
        </h5>
        <h6 className="user-city-info">
        <span>
          <FontAwesomeIcon className="user-location" icon="map-marker-alt" />
        </span>
        <span className="user-city">
          {props.city}
        </span>
        </h6>
      </header>
      <main className="profile-btn-actions">
        <Link to={`/users/${props.user.id}/update`} >
          <div className="user-manage-profile">
            <FontAwesomeIcon className="user-btn-actions" id="manage-profile" icon="cog" />
              <p className="manage-profile-btn-text mb-0">
                profile
              </p>
          </div>
        </Link>
        <Link to='/new_post' >
          <div className="user-new-post">
            <FontAwesomeIcon className="user-btn-actions" id="new-post" icon="edit" />
              <p className="create-post-btn-text mb-0">
                post
              </p>
          </div>
        </Link>
      </main>
    </section>
  )
}

export default ProfileUserCard;
