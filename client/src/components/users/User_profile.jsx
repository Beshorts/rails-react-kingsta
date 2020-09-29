import React, { useEffect, useState } from 'react';

import axios from 'axios';

// import elements
import ProfileUserCard from '../elements/profile_card/Profile_user_card';

// import library to generate avatars
import Avatar from 'react-avatar';

function UserProfile(props) {

  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    let isSubscribed = true;
    const { userId } = props.match.params

    axios.get(`/api/users/${userId}`, {user}, {withCredentials: true})
      .then(response => {
       // isSubscribed => cleanup useEffect to avoid memory leaks
        if (isSubscribed) {
          setLoading(true);
          setError(false);
          setUser(response.data.user);
          console.log(response.data.user)
        }
      })
      .catch((error) => {
        setError(true);
      })
      setLoading(false);
      return () => isSubscribed = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setUser, props.match.params]);

  // add logic to handle error and loading
  let userContainer = null;

  // style alert messages
  const redAlert = { color: 'red' };
  const greenAlert = { color: 'green'};

  if (error) {
    userContainer = <div className="container-infos-actions col-12 col-lg-8">
                      <h5 className="user-error pl-3"
                          style={redAlert} >
                          something went very very bad!
                      </h5>
                    </div>
  } else if (!user) {
    userContainer = <div className="container-infos-actions col-12 col-lg-8">
                      <h5 className="loading-user pl-3"
                          style={greenAlert} >
                          Loading user info...
                      </h5>
                    </div>
  } else {
    userContainer = <ProfileUserCard
                      avatar={ <Avatar size="70" round="50px" name={user.username}/> }
                      username={user.username}
                      bio={user.bio}
                      city={user.city}
                    />
  }

  return (
    <div className="row current-infos justify-content-center">
      {userContainer}
    </div>
  )
}

export default UserProfile;
