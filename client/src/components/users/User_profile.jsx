import React, { useEffect, useState } from 'react';

import axios from 'axios';

// import elements
import ProfileUserCard from '../elements/profile_card/Profile_user_card';
import UserNavActions from '../navigations/nav_actions/User_nav_actions';
import Img from '../elements/Img';
import Loading from '../elements/loading/Loading';
import ErrorMessage from '../elements/errors/error_message/Error_message';

// import initialezed context to create provider
import UserProfileContext from '../../contexts/UserProfileContext';

function UserProfile(props) {

  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // data to share through context
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState('');

  const { userId } = props.match.params

    const getUser = async () => {
      try {
         setLoading(true);
         setError(false);
         const response = await axios.get(`/api/users/${userId}`, {user}, {withCredentials: true})
           setAvatar(response.data.avatar);
           setImages(response.data.images);
           setUser(response.data.user);
           setPosts(response.data.posts);
           setError(false);
           setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

  useEffect(() => {
    getUser();
  }, []);

  // logic to display correct view based on response
  let userContainer = null;

  if (error) {
    userContainer = <div className="container-user-profile">
                      <section className="container user-current-infos">
                        <ErrorMessage />
                      </section>
                    </div>
  } else if (loading) {
    userContainer = <Loading />

  } else {
    userContainer=
    <div className="container-user-profile">
      <section className="container user-current-infos">
        <div className="row current-infos justify-content-center">
          <div className="profile-user-card">
            <ProfileUserCard
              user={user}
              avatar={ <Img className="profile-avatar-img" url={avatar} alt="me" /> }
              username={user.username}
              bio={user.bio}
              city={user.city}
            />
          </div>
        </div>
      </section>
     {/* create context provider to share user posts and their associated images,
         make it accessible through the tree component */}
      <UserProfileContext.Provider value={{posts, images}}>
        <UserNavActions />
      </UserProfileContext.Provider>
      </div>
  }

  return (
    <section className="user-profile">
      {userContainer}
    </section>
  )
}

export default UserProfile;
