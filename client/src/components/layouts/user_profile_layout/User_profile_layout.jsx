import React from 'react';

const  UserProfileLayout = (props) => {

  return(
    <section className="user-profile">
      <section className="container user-current-infos">
        {props.user}
      </section>
      <section className="container user-nav-profile-actions mt-4">
        {props.navigation}
      </section>
      <section className="container user-posts-index px-0 mt-3 mb-5">
        {props.posts}
      </section>
    </section>
  )
}

export default UserProfileLayout;
